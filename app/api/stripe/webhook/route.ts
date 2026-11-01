import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secretKey || !webhookSecret) return NextResponse.json({ error: "Webhook is not configured." }, { status: 503 });
  const signature = (await headers()).get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  try {
    const stripe = new Stripe(secretKey);
    const event = stripe.webhooks.constructEvent(await request.text(), signature, webhookSecret);
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (url && serviceKey) {
        const supabase = createClient(url, serviceKey);
        const cart = JSON.parse(session.metadata?.cart || "[]") as Array<{ productId: string; quantity: number }>;
        const { data: order, error } = await supabase.from("orders").insert({
          stripe_session_id: session.id,
          customer_email: session.customer_details?.email,
          amount_total: (session.amount_total || 0) / 100,
          shipping_zone: session.metadata?.zone,
          status: "paid",
        }).select("id").single();
        if (error) throw error;
        if (order) {
          await supabase.from("order_items").insert(cart.map((item) => ({ order_id: order.id, product_id: item.productId, quantity: item.quantity })));
          for (const item of cart) await supabase.rpc("decrement_inventory", { product_key: item.productId, ordered_quantity: item.quantity });
        }
      }
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid webhook." }, { status: 400 });
  }
}
