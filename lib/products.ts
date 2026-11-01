import type { Product } from "./types";

// Names and category coverage are based on the reference catalog.
// Prices are temporary INR samples and must be reviewed before launch.
const productNames = [
  "Plastic Container Transparent Round – R-10",
  "Plastic Container Transparent – 1000ml",
  "Plastic Container Transparent – 750ml",
  "Plastic Container Transparent – 500ml",
  "Plastic Container Round – R-16",
  "Plastic Container Transparent – 1500ml (Square)",
  "1000ml Kraft Rectangular Bowl With Lid",
  "1000ml Kraft Salad Bowl With Lid",
  "10oz Kraft Soup Bucket With Lid",
  "12oz Juice Cup Without Lid",
  "12oz Kraft Soup Bucket With Lid",
  "150ml Dessert Cup With Dome Lid",
  "150ml Dessert Cup With Flat Lid",
  "150ml Dessert Cup Without Lid",
  "16oz Juice Cup Without Lid",
  "16oz Kraft Soup Bucket With Lid",
  "2-in-1 Disposable Drink Cup with Snack Bowl",
  "360ml Kraft Rectangular Bowl With Lid",
  "500ml Kraft Salad Bowl With Lid",
  "650ml Kraft Rectangular Bowl With Lid",
  "700ml Bagasse Oval Container",
  "7oz Paper Cup",
  "8oz Kraft Soup Bucket With Lid",
  "9oz PET Glass With Sipper Lid",
  "Aluminium Container F-1 With Lid",
  "Aluminium Container F-2 With Lid",
  "Coffee Cup Lid Black",
  "Coffee Cup Without Lid – 8oz Black",
  "Coffee Cup Without Lid – 8oz White",
  "Coffee Cup With Cap – 8oz Black",
  "Coffee Cup With Cap – 8oz White",
  "Cup With Lid – 60ml",
  "Dessert Cup With Dome Lid – 9oz",
  "Dessert Cup With Flat Lid – 9oz",
  "Dessert Cup Without Lid – 9oz",
  "Dessert Spoon – Mixed Grade",
  "Dessert Spoon – Premium Grade",
  "Disposable Plastic Table Spoon Black",
  "Disposable Plastic Table Spoon White",
  "Disposable Plastic White Fork",
  "Disposable Transparent Spoon",
  "Disposable Transparent Tea Spoon",
  "Dome Lid 92mm Without Punch",
  "Dome Lid 92mm With Punch",
  "F-1 Lid For Aluminium Container",
  "F-2 Lid For Aluminium Container",
  "F-3 Lid For Aluminium Container",
  "Juice Cup With Lid – 12oz",
  "Juice Cup With Lid – 16oz",
  "Juice Glass 210ml",
  "Juice Glass 250ml",
  "Milky Lid 74mm",
  "Milky Lid 94mm",
  "Paper Cup With Handle",
  "Pepsi Glass 210ml",
  "Plastic Container 4-Portion Tray",
  "Plastic Container 5-Portion Tray With Attached Lid",
  "Plastic Container Black – 3-Portion Tray Round",
  "Plastic Container Black – 3-Portion Tray Square",
  "Plastic Container Black – 4-Portion Tray",
  "Plastic Container Black – C-1000ml",
  "Plastic Container Black – C-1500ml",
  "Plastic Container Black – C-2000ml",
  "Plastic Container Black – C-3000ml",
  "Plastic Container Black – C-500ml",
  "Plastic Container Black – C-750ml",
  "Plastic Container Black – R-16",
  "Plastic Container Black – RFC-1000ml",
  "Plastic Container Black – RFC-650ml",
  "Plastic Container Milky – 1500ml",
  "Plastic Container Milky – 2000ml",
  "Plastic Container Milky – 3000ml",
  "Plastic Container Round – RFC-1000ml",
  "Plastic Container Round – RFC-3000ml",
  "Plastic Container Round – RFC-650ml",
  "Plastic Container Transparent – 1500ml Rectangle",
  "Plastic Container Transparent – 150ml",
  "Plastic Container Transparent – 2000ml",
  "Plastic Container Transparent – 200ml",
  "Plastic Container Transparent – 3000ml",
  "Plastic Jar 1kg – Pack of 6",
  "Plastic Jar 500g – Pack of 8",
  "Plastic Jar 250g – Pack of 12",
  "Plastic Jar 200g – Pack of 12",
  "Plastic Soup Spoon",
  "Ripple Cup Without Lid – 8oz",
  "Ripple Cup With Cap – 8oz",
  "Styrofoam BBQ Box PP-19",
  "Styrofoam Bowl PP-18",
  "Styrofoam Glass 6oz",
  "Styrofoam Large Biryani Box PP-22",
  "Styrofoam Large Plate PP-15",
  "Styrofoam Large Tray PP-17",
  "Styrofoam Lunch Box 2-Portion PP-10",
  "Styrofoam Lunch Box 3-Portion PP-21",
  "Styrofoam Medium Tray PP-08",
  "Styrofoam Shawarma Box PP-26",
  "Styrofoam Small Burger Box PP-11",
  "Styrofoam Small Plate PP-14",
  "Styrofoam Soup Bowl PP-38",
  "Styrofoam Sweet Tub PP-04",
  "Transparent Lid Without Punch 92mm",
  "Transparent Lid With Punch 92mm",
  "U-Shaped Clear Cup With Lid",
  "White Falooda Spoon",
  "White Paper Bowl 250ml",
  "White Straw",
  "White Straw With Wrap",
  "Wooden Fork – 100 Pieces",
  "Wooden Knife – 100 Pieces",
  "Wooden Spoon",
  "Deli 8oz Container",
  "Deli 6oz Container",
  "Deli 32oz Container",
  "Deli 24oz Container",
  "Deli 12oz Container",
  "Deli 16oz Container",
  "16oz Tumbler Glass With Lid",
  "500ml White Paper Bowl With Lid",
] as const;

const categoryImages: Record<string, string> = {
  "Plastic Containers": "https://images.unsplash.com/photo-1610562275255-03b7fa0d4655?auto=format&fit=crop&w=900&q=80",
  "Kraft Food Packaging": "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=900&q=80",
  "Cups & Drinkware": "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=900&q=80",
  "Cutlery & Straws": "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?auto=format&fit=crop&w=900&q=80",
  Lids: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=900&q=80",
  "Styrofoam Packaging": "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=900&q=80",
  Jars: "https://images.unsplash.com/photo-1610562275255-03b7fa0d4655?auto=format&fit=crop&w=900&q=80",
  "Aluminium Containers": "https://images.unsplash.com/photo-1610562275255-03b7fa0d4655?auto=format&fit=crop&w=900&q=80",
  "Bagasse Packaging": "https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=900&q=80",
};

function categoryFor(name: string) {
  const value = name.toLowerCase();
  if (value.includes("styrofoam")) return "Styrofoam Packaging";
  if (value.includes("kraft")) return "Kraft Food Packaging";
  if (value.includes("bagasse")) return "Bagasse Packaging";
  if (value.includes("aluminium")) return "Aluminium Containers";
  if (value.includes("jar")) return "Jars";
  if (value.includes("lid") && !value.includes("with lid") && !value.includes("cup")) return "Lids";
  if (["spoon", "fork", "knife", "straw"].some((term) => value.includes(term))) return "Cutlery & Straws";
  if (["cup", "glass", "tumbler", "dessert", "paper bowl"].some((term) => value.includes(term))) return "Cups & Drinkware";
  return "Plastic Containers";
}

function slugify(value: string) {
  return value.toLowerCase().replaceAll("–", "-").replaceAll("—", "-").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const basePrices: Record<string, number> = {
  "Plastic Containers": 35,
  "Kraft Food Packaging": 45,
  "Cups & Drinkware": 18,
  "Cutlery & Straws": 6,
  Lids: 5,
  "Styrofoam Packaging": 14,
  Jars: 110,
  "Aluminium Containers": 25,
  "Bagasse Packaging": 55,
};

export const products: Product[] = productNames.map((name, index) => {
  const category = categoryFor(name);
  const packMatch = name.match(/Pack of (\d+)|– (\d+) Pieces/i);
  const isPack = Boolean(packMatch);
  const samplePrice = basePrices[category] + (index % 6) * 5;
  return {
    id: `catalog-${String(index + 1).padStart(3, "0")}`,
    name,
    slug: slugify(name),
    category,
    description: `${name} for restaurants, takeaway service, catering, and events. Temporary sample price in INR.`,
    image: categoryImages[category],
    unitLabel: isPack ? "pack" : "piece",
    packSize: isPack ? Number(packMatch?.[1] || packMatch?.[2] || 1) : 1,
    weightKg: category.includes("Styrofoam") ? 0.03 : category.includes("Plastic") ? 0.08 : 0.05,
    stock: 100 + ((index * 37) % 400),
    featured: index < 6,
    tiers: [
      { min: 1, unitPrice: samplePrice },
      { min: 100, unitPrice: Math.round(samplePrice * 0.92) },
      { min: 500, unitPrice: Math.round(samplePrice * 0.85) },
    ],
  };
});

export const categories = ["All", ...Array.from(new Set(products.map((product) => product.category)))];
