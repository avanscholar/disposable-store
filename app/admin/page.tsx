import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { BarChart3, Boxes, DollarSign, ShoppingCart } from "lucide-react";
import { products as fallbackProducts } from "@/lib/products";
import { formatCurrency } from "@/lib/pricing";
import { createClient } from "@/lib/supabase/server";

type DbProduct = { id: string; name: string; stock: number; active: boolean };
type DbOrder = { id: string; customer_email: string | null; amount_total: number; status: string; created_at: string };

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  const admins = (process.env.ADMIN_EMAILS || "").split(",").map((email) => email.trim().toLowerCase()).filter(Boolean);
  if (supabase && (!user || !user.email || !admins.includes(user.email.toLowerCase()))) redirect("/account");

  let inventory: DbProduct[] = fallbackProducts.map((product) => ({ id: product.id, name: product.name, stock: product.stock, active: true }));
  let orders: DbOrder[] = [];
  if (supabase) {
    const [productResult, orderResult] = await Promise.all([supabase.from("products").select("id,name,stock,active").order("name"), supabase.from("orders").select("id,customer_email,amount_total,status,created_at").order("created_at", { ascending: false }).limit(20)]);
    if (productResult.data?.length) {
      const stored = new Map(productResult.data.map((item) => [item.id, item]));
      inventory = fallbackProducts.map((product) => stored.get(product.id) || { id: product.id, name: product.name, stock: product.stock, active: true });
    }
    if (orderResult.data) orders = orderResult.data;
  }

  async function updateInventory(formData: FormData) {
    "use server";
    const client = await createClient();
    if (!client) return;
    const { data: { user: currentUser } } = await client.auth.getUser();
    const allowed = (process.env.ADMIN_EMAILS || "").split(",").map((email) => email.trim().toLowerCase());
    if (!currentUser?.email || !allowed.includes(currentUser.email.toLowerCase())) return;
    await client.from("products").upsert({ id: String(formData.get("id")), name: String(formData.get("name")), stock: Math.max(0, Number(formData.get("stock"))), active: true });
    revalidatePath("/admin");
  }

  const revenue = orders.filter((order) => order.status === "paid").reduce((sum, order) => sum + Number(order.amount_total), 0);
  return <section className="admin-page"><div className="admin-heading"><div><span className="eyebrow">STORE CONTROL CENTER</span><h1>Inventory & orders</h1><p>Review sales and keep stock quantities current.</p></div><a href="/" className="button secondary-button">View storefront</a></div>
    <div className="metric-grid"><div><span><ShoppingCart /></span><small>Orders</small><strong>{orders.length}</strong></div><div><span><DollarSign /></span><small>Recorded revenue</small><strong>{formatCurrency(revenue)}</strong></div><div><span><Boxes /></span><small>Units in stock</small><strong>{inventory.reduce((sum, item) => sum + item.stock, 0)}</strong></div><div><span><BarChart3 /></span><small>Low-stock items</small><strong>{inventory.filter((item) => item.stock < 20).length}</strong></div></div>
    <div className="admin-grid"><div className="admin-panel"><h2>Inventory</h2><div className="admin-table">{inventory.map((product) => <form action={updateInventory} key={product.id} className="inventory-row"><input type="hidden" name="id" value={product.id} /><input type="hidden" name="name" value={product.name} /><div><strong>{product.name}</strong><small>{product.active ? "Active" : "Hidden"}</small></div><label>Stock<input name="stock" type="number" min="0" defaultValue={product.stock} /></label><button className="save-button">Save</button></form>)}</div></div>
      <div className="admin-panel"><h2>Recent orders</h2>{orders.length ? <div className="orders-list">{orders.map((order) => <div key={order.id}><span><strong>{order.customer_email || "Guest customer"}</strong><small>{new Date(order.created_at).toLocaleDateString()}</small></span><span><strong>{formatCurrency(Number(order.amount_total))}</strong><small className={`status ${order.status}`}>{order.status}</small></span></div>)}</div> : <div className="empty-admin"><ShoppingCart /><h3>No recorded orders yet</h3><p>Stripe orders will appear after the webhook is configured.</p></div>}</div>
    </div></section>;
}
