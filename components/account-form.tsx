"use client";

import { LogIn, UserPlus } from "lucide-react";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function AccountForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); setMessage("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    const supabase = createClient();
    if (!supabase) { setMessage("Add Supabase keys to .env.local to enable customer accounts."); setLoading(false); return; }
    const result = mode === "login" ? await supabase.auth.signInWithPassword({ email, password }) : await supabase.auth.signUp({ email, password });
    setMessage(result.error ? result.error.message : mode === "login" ? "Signed in. Redirecting…" : "Account created. Check your email to confirm it.");
    setLoading(false);
    if (!result.error && mode === "login") window.location.href = "/account";
  }

  return <div className="account-card"><div className="auth-tabs"><button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>Sign in</button><button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>Create account</button></div><form onSubmit={submit}><label>Email address<input name="email" type="email" required autoComplete="email" placeholder="you@company.com" /></label><label>Password<input name="password" type="password" required minLength={8} autoComplete={mode === "login" ? "current-password" : "new-password"} placeholder="At least 8 characters" /></label>{message && <p className="form-message">{message}</p>}<button className="button" disabled={loading}>{mode === "login" ? <LogIn size={18} /> : <UserPlus size={18} />}{loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}</button></form><p className="account-note">Your account lets you review orders and checkout faster.</p></div>;
}
