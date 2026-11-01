"use client";

import Link from "next/link";
import { Menu, PackageCheck, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "./cart-provider";

const links = [{ href: "/shop", label: "Shop" }, { href: "/#wholesale", label: "Wholesale" }, { href: "/#shipping", label: "Shipping" }];

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand"><span className="brand-mark"><PackageCheck size={22} /></span><span>EcoServe<small>SUPPLY</small></span></Link>
        <nav className={open ? "nav open" : "nav"}>
          {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
          <Link href="/account" className="mobile-only" onClick={() => setOpen(false)}>Account</Link>
        </nav>
        <div className="header-actions">
          <Link href="/account" className="icon-link" aria-label="Account"><UserRound size={21} /></Link>
          <Link href="/cart" className="cart-link" aria-label={`Cart with ${count} items`}><ShoppingBag size={21} /> Cart <span>{count}</span></Link>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
    </header>
  );
}
