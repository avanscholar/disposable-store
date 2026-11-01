import type { ShippingZone } from "./types";

const zoneRates: Record<ShippingZone, { base: number; perKg: number; freeAt: number }> = {
  local: { base: 7, perKg: 0.25, freeAt: 250 },
  regional: { base: 14, perKg: 0.55, freeAt: 500 },
  national: { base: 22, perKg: 0.85, freeAt: 900 },
};

export function calculateShipping(zone: ShippingZone, weightKg: number, subtotal: number) {
  const rate = zoneRates[zone];
  if (subtotal >= rate.freeAt) return 0;
  return Math.round((rate.base + rate.perKg * weightKg) * 100) / 100;
}
