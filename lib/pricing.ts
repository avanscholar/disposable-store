import type { Product } from "./types";

export function getUnitPrice(product: Product, quantity: number) {
  return [...product.tiers]
    .sort((a, b) => b.min - a.min)
    .find((tier) => quantity >= tier.min)?.unitPrice ?? product.tiers[0].unitPrice;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}
