"use client";

import Image from "next/image";
import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/pricing";
import { useCart } from "./cart-provider";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const basePrice = product.tiers[0].unitPrice;
  const handleAdd = () => {
    add(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };
  return <article className="product-card">
    <div className="product-image"><Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 100vw, 33vw" /><span>{product.category}</span></div>
    <div className="product-body">
      <p className="pack-line">{product.packSize.toLocaleString()} pieces / {product.unitLabel}</p>
      <h3>{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <div className="product-meta"><div><small>From</small><strong>{formatCurrency(basePrice)}</strong><small> / {product.unitLabel}</small></div><span className={product.stock < 20 ? "low-stock" : "in-stock"}>{product.stock < 20 ? `Only ${product.stock} left` : "In stock"}</span></div>
      <div className="tier-strip">{product.tiers.slice(1).map((tier) => <span key={tier.min}>{tier.min}+ {formatCurrency(tier.unitPrice)}</span>)}</div>
      <button className={added ? "button added" : "button"} onClick={handleAdd}>{added ? <><Check size={18} /> Added</> : <><ShoppingBag size={18} /> Add to cart</>}</button>
    </div>
  </article>;
}
