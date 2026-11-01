import type { ShippingZone } from "./types";

const zoneRates: Record<ShippingZone, { base: number; perKg: number; freeAt: number }> = {
  local: { base: 79, perKg: 8, freeAt: 999 },
  regional: { base: 149, perKg: 16, freeAt: 1999 },
  national: { base: 249, perKg: 25, freeAt: 3999 },
};

export function calculateShipping(zone: ShippingZone, weightKg: number, subtotal: number) {
  const rate = zoneRates[zone];
  if (subtotal >= rate.freeAt) return 0;
  return Math.round((rate.base + rate.perKg * weightKg) * 100) / 100;
}
