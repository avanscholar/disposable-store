import Link from "next/link";
import { Mail, MapPin, PackageCheck, Phone } from "lucide-react";

export function Footer() {
  return <footer className="footer">
    <div className="footer-grid">
      <div><div className="brand footer-brand"><span className="brand-mark"><PackageCheck size={22} /></span><span>EcoServe<small>SUPPLY</small></span></div><p>Reliable disposable supplies for restaurants, offices, caterers, and events.</p></div>
      <div><h4>Shop</h4><Link href="/shop">All 119 products</Link><Link href="/shop">Food containers</Link><Link href="/shop">Cups and drinkware</Link></div>
      <div><h4>Support</h4><Link href="/#shipping">Shipping</Link><Link href="/#wholesale">Wholesale pricing</Link><Link href="/account">My account</Link></div>
      <div><h4>Contact</h4><p><Mail size={16} /> hello@example.com</p><p><Phone size={16} /> WhatsApp: +91 97117 16454</p><p><MapPin size={16} /> India</p></div>
    </div>
    <div className="footer-bottom">© {new Date().getFullYear()} EcoServe Supply. All rights reserved.</div>
  </footer>;
}
