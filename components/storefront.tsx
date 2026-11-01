"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { categories, products } from "@/lib/products";
import { ProductCard } from "./product-card";

export function Storefront({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const filtered = useMemo(() => products.filter((product) =>
    (category === "All" || product.category === category) &&
    `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(query.toLowerCase())), [query, category]);
  const visible = compact && !query && category === "All" ? filtered.filter((item) => item.featured) : filtered;

  return <div className="storefront">
    <div className="catalog-tools">
      <label className="search-box"><Search size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search plates, cups, packaging…" /></label>
      <div className="category-list"><SlidersHorizontal size={18} />{categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>
    </div>
    <div className="product-grid">{visible.map((product) => <ProductCard key={product.id} product={product} />)}</div>
    {!visible.length && <div className="empty-state"><h3>No products found</h3><p>Try another search or category.</p></div>}
  </div>;
}
