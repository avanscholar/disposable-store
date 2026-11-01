import Link from "next/link";
import { ArrowRight, BadgeCheck, Box, Headphones, Leaf, ShieldCheck, Truck } from "lucide-react";
import { Storefront } from "@/components/storefront";

export default function Home() {
  return <>
    <section className="hero">
      <div className="hero-copy"><span className="eyebrow"><Leaf size={15} /> Smarter supplies. Better service.</span><h1>Everyday essentials,<br /><em>delivered in bulk.</em></h1><p>Dependable disposable products for foodservice, offices, events, and growing businesses—with transparent wholesale pricing.</p><div className="hero-actions"><Link className="button button-large" href="/shop">Shop all products <ArrowRight size={19} /></Link><Link className="text-link" href="#wholesale">See wholesale pricing</Link></div><div className="trust-row"><span><ShieldCheck /> Secure checkout</span><span><Truck /> Fast shipping</span><span><BadgeCheck /> Quality assured</span></div></div>
      <div className="hero-visual"><div className="hero-card card-one"><Leaf /><strong>Lower-impact choices</strong><span>Compostable & recycled options</span></div><div className="hero-box"><div className="box-tape" /><span>ESSENTIALS<br />FOR BUSINESS</span><Box size={110} strokeWidth={1} /></div><div className="hero-card card-two"><Truck /><strong>Free delivery</strong><span>On qualifying bulk orders</span></div></div>
    </section>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">POPULAR PICKS</span><h2>Built for busy businesses</h2><p>Stock up on the essentials your operation uses every day.</p></div><Link href="/shop" className="text-link">View full catalog <ArrowRight size={17} /></Link></div><Storefront compact /></section>
    <section id="wholesale" className="wholesale-section"><div><span className="eyebrow light">WHOLESALE MADE SIMPLE</span><h2>More volume.<br />Better pricing.</h2><p>Quantity discounts apply automatically in your cart. No coupon codes, phone calls, or waiting for a quote.</p><Link href="/shop" className="button white-button">Explore wholesale products <ArrowRight size={18} /></Link></div><div className="pricing-steps"><div><span>01</span><h3>Choose your products</h3><p>Add individual cases or build a mixed-product order.</p></div><div><span>02</span><h3>Unlock tier pricing</h3><p>Your unit price drops automatically at each volume tier.</p></div><div><span>03</span><h3>Checkout your way</h3><p>Pay securely with Stripe or send the order through WhatsApp.</p></div></div></section>
    <section id="shipping" className="features-section"><div><Truck /><h3>Calculated shipping</h3><p>Rates reflect order weight and delivery zone, with free-shipping thresholds.</p></div><div><ShieldCheck /><h3>Secure payments</h3><p>Card information is handled by Stripe and never stored on this website.</p></div><div><Headphones /><h3>Human support</h3><p>Use WhatsApp for product questions, bulk orders, and quick assistance.</p></div></section>
  </>;
}
