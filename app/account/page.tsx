import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AccountForm } from "@/components/account-form";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Account" };

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  async function signOut() { "use server"; const client = await createClient(); await client?.auth.signOut(); redirect("/account"); }
  if (user) return <section className="section page-section account-section"><div className="page-heading"><span className="eyebrow">MY ACCOUNT</span><h1>Welcome back</h1><p>{user.email}</p></div><div className="account-card signed-in"><h2>Your orders</h2><p>Completed Stripe orders linked to your email will appear here.</p><form action={signOut}><button className="button secondary-button">Sign out</button></form></div></section>;
  return <section className="section page-section account-section"><div className="page-heading"><span className="eyebrow">CUSTOMER ACCOUNT</span><h1>Sign in or get started</h1><p>Track orders and save time on repeat purchases.</p></div><AccountForm /></section>;
}
