import { NextResponse } from "next/server";
import Stripe from "stripe";
import { products } from "@/lib/products";
import { getUnitPrice } from "@/lib/pricing";
import { calculateShipping } from "@/lib/shipping";
import type { ShippingZone } from "@/lib/types";

type RequestItem = { productId: string; quantity: number };

export async function POST(request: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) return NextResponse.json({ error: "Stripe is not configured yet. Add STRIPE_SECRET_KEY to .env.local." }, { status: 503 });
    const { items, zone = "regional" } = await request.json() as { items: RequestItem[]; zone: ShippingZone };
    if (!Array.isArray(items) || !items.length) return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
    const validated = items.map(({ productId, quantity }) => {
      const product = products.find((candidate) => candidate.id === productId);
      if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > product.stock) throw new Error("Invalid product or quantity.");
      return { product, quantity };
    });
    const subtotal = validated.reduce((sum, item) => sum + getUnitPrice(item.product, item.quantity) * item.quantity, 0);
    const weight = validated.reduce((sum, item) => sum + item.product.weightKg * item.quantity, 0);
    const shipping = calculateShipping(zone, weight, subtotal);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      allow_promotion_codes: true,
      billing_address_collection: "required",
      shipping_address_collection: { allowed_countries: ["US"] },
      line_items: [
        ...validated.map(({ product, quantity }) => ({ quantity, price_data: { currency: "usd", unit_amount: Math.round(getUnitPrice(product, quantity) * 100), product_data: { name: product.name, description: `${product.packSize} pieces per ${product.unitLabel}`, metadata: { productId: product.id } } } })),
        ...(shipping ? [{ quantity: 1, price_data: { currency: "usd", unit_amount: Math.round(shipping * 100), product_data: { name: `${zone[0].toUpperCase()}${zone.slice(1)} shipping` } } }] : []),
      ],
      metadata: { zone, cart: JSON.stringify(validated.map(({ product, quantity }) => ({ productId: product.id, quantity }))) },
      success_url: `${siteUrl}/account?checkout=success`,
      cancel_url: `${siteUrl}/cart?checkout=cancelled`,
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to start checkout." }, { status: 400 });
  }
}
