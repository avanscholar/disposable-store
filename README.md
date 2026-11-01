# EcoServe Supply

A production-oriented storefront with 119 disposable and foodservice products. It includes catalog search, category filtering, persistent cart, automatic wholesale pricing, delivery-zone shipping, Stripe Checkout, WhatsApp ordering, Supabase customer accounts, order webhooks, and an admin inventory dashboard.

## Stack

- Next.js App Router + TypeScript
- Supabase Auth and Postgres
- Stripe Checkout and webhooks
- Plain CSS design system (no UI framework required)

## Local setup

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local` and add your credentials.
3. Run `supabase/schema.sql` in the Supabase SQL editor.
4. Start the app: `npm run dev`

The catalog and cart work without external services. Stripe payments and customer accounts activate after their environment variables are added.

## Stripe webhook

Create a Stripe webhook for `checkout.session.completed` pointing to:

`https://YOUR-DOMAIN.com/api/stripe/webhook`

Put the signing secret in `STRIPE_WEBHOOK_SECRET`.

## Deployment

Import this repository into Vercel, add the environment variables, and deploy. Set `NEXT_PUBLIC_SITE_URL` to the production URL. Replace the sample store name, contact details, WhatsApp number, products, and images before launch.

## Admin access

Add one or more comma-separated account emails to `ADMIN_EMAILS`. After signing in, visit `/admin` to see orders and update stock.

## Important production checks

- Review every temporary INR price, stock quantity, product image, and contact detail.
- Confirm tax, returns, privacy, and shipping policies for the jurisdictions where you sell.
- Test Stripe in test mode before enabling live keys.
- Add your domain to Supabase Auth redirect URLs.
