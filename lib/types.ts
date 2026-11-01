export type PriceTier = { min: number; unitPrice: number };

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  unitLabel: string;
  packSize: number;
  weightKg: number;
  stock: number;
  featured?: boolean;
  tiers: PriceTier[];
};

export type CartItem = { product: Product; quantity: number };

export type ShippingZone = "local" | "regional" | "national";
