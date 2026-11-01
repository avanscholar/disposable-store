"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CreditCard, MessageCircle, Minus, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { formatCurrency, getUnitPrice } from "@/lib/pricing";
import { calculateShipping } from "@/lib/shipping";
import type { ShippingZone } from "@/lib/types";
import { useCart } from "./cart-provider";

export function CartPage() {
  const { items, update, remove } = useCart();
  const [zone, setZone] = useState<ShippingZone>("regional");
  const [loading, setLoading] = useState(false);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + getUnitPrice(item.product, item.quantity) * item.quantity, 0), [items]);
  const weight = useMemo(() => items.reduce((sum, item) => sum + item.product.weightKg * item.quantity, 0), [items]);
  const shipping = calculateShipping(zone, weight, subtotal);
  const total = subtotal + shipping;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "15551234567";
  const whatsappText = encodeURIComponent(`Hello! I would like to place this order:\n${items.map((item) => `• ${item.quantity} × ${item.product.name} — ${formatCurrency(getUnitPrice(item.product, item.quantity) * item.quantity)}`).join("\n")}\nShipping zone: ${zone}\nEstimated total: ${formatCurrency(total)}`);

  async function checkout() {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: items.map((item) => ({ productId: item.product.id, quantity: item.quantity })), zone }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Checkout could not start.");
      window.location.href = data.url;
    } catch (error) {
      alert(error instanceof Error ? error.message : "Checkout could not start.");
      setLoading(false);
    }
  }

  if (!items.length) return <section className="section page-section empty-cart"><div className="empty-icon">🛒</div><h1>Your cart is empty</h1><p>Add supplies from the catalog to begin your order.</p><Link className="button" href="/shop">Browse products</Link></section>;

  return <section className="section page-section cart-page"><div className="page-heading compact"><Link href="/shop" className="text-link"><ArrowLeft size={17} /> Continue shopping</Link><h1>Your cart</h1><p>{items.length} product{items.length === 1 ? "" : "s"} in this order</p></div>
    <div className="cart-layout"><div className="cart-items">{items.map(({ product, quantity }) => { const unitPrice = getUnitPrice(product, quantity); return <article className="cart-item" key={product.id}><div className="cart-thumb"><Image src={product.image} alt="" fill sizes="100px" /></div><div className="cart-item-info"><small>{product.category}</small><h3>{product.name}</h3><p>{product.packSize.toLocaleString()} pieces / {product.unitLabel}</p><button onClick={() => remove(product.id)}><Trash2 size={15} /> Remove</button></div><div className="quantity-control"><button onClick={() => update(product.id, quantity - 1)} aria-label="Decrease"><Minus size={15} /></button><span>{quantity}</span><button onClick={() => update(product.id, quantity + 1)} aria-label="Increase"><Plus size={15} /></button></div><div className="cart-price"><strong>{formatCurrency(unitPrice * quantity)}</strong><small>{formatCurrency(unitPrice)} / {product.unitLabel}</small>{quantity >= product.tiers[1]?.min && <span>Volume price applied</span>}</div></article>; })}</div>
      <aside className="order-summary"><h2>Order summary</h2><label>Delivery zone<select value={zone} onChange={(event) => setZone(event.target.value as ShippingZone)}><option value="local">Local</option><option value="regional">Regional</option><option value="national">National</option></select></label><div className="summary-line"><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div><div className="summary-line"><span>Shipping ({weight.toFixed(1)} kg)</span><strong>{shipping ? formatCurrency(shipping) : "FREE"}</strong></div><div className="summary-total"><span>Estimated total</span><strong>{formatCurrency(total)}</strong></div><button className="button checkout-button" disabled={loading} onClick={checkout}><CreditCard size={18} /> {loading ? "Opening checkout…" : "Pay securely with Stripe"}</button><a className="button whatsapp-button" href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Order through WhatsApp</a><p className="secure-note">Taxes, if applicable, are calculated during payment.</p></aside>
    </div></section>;
}
