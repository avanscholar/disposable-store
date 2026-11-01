import type { Metadata } from "next";
import { Storefront } from "@/components/storefront";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return <section className="section page-section"><div className="page-heading"><span className="eyebrow">FULL CATALOG</span><h1>Supplies that keep you moving</h1><p>Search the catalog, compare quantity tiers, and build your order.</p></div><Storefront /></section>;
}
