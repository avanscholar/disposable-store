-- Run this file in the Supabase SQL editor.
create table if not exists public.products (
  id text primary key,
  name text not null,
  stock integer not null default 0 check (stock >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text unique,
  user_id uuid references auth.users(id) on delete set null,
  customer_email text,
  amount_total numeric(12,2) not null default 0,
  shipping_zone text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null references public.products(id),
  quantity integer not null check (quantity > 0)
);

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "Public can read active products" on public.products for select using (active = true);
create policy "Customers can read own orders" on public.orders for select using (auth.uid() = user_id or customer_email = auth.jwt() ->> 'email');
create policy "Customers can read own order items" on public.order_items for select using (exists (select 1 from public.orders where orders.id = order_items.order_id and (orders.user_id = auth.uid() or orders.customer_email = auth.jwt() ->> 'email')));

create or replace function public.decrement_inventory(product_key text, ordered_quantity integer)
returns void language sql security definer set search_path = public as $$
  update products set stock = greatest(0, stock - ordered_quantity), updated_at = now() where id = product_key;
$$;

insert into public.products (id, name, stock) values
  ('eco-plate-10', 'Compostable Dinner Plates', 48),
  ('paper-cup-12', 'Double-Wall Paper Cups', 65),
  ('kraft-box-32', 'Kraft Takeout Boxes', 31),
  ('wood-cutlery', 'Wooden Cutlery Sets', 74),
  ('clear-gloves', 'Food-Safe Clear Gloves', 92),
  ('recycled-napkin', 'Recycled Paper Napkins', 54)
on conflict (id) do update set name = excluded.name;
