import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: { default: "EcoServe Supply | Disposable & Foodservice Supplies", template: "%s | EcoServe Supply" },
  description: "Wholesale disposable tableware, drinkware, food packaging, cutlery, and hygiene products.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${manrope.variable}`}><CartProvider><Header /><main>{children}</main><Footer /></CartProvider></body></html>;
}
