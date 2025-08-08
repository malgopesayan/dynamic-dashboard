// src/lib/helpers.ts
import { ColorRule } from '@/types';

// Helper to format a Date object to 'YYYY-MM-DD'
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Helper to calculate the visual center (centroid) of a polygon
export const getCentroid = (points: { lat: number; lng: number }[] | [number, number][]): { lat: number; lon: number } => {
  let latSum = 0;
  let lonSum = 0;
  const count = points.length;
  points.forEach((p) => {
    if (Array.isArray(p)) {
      latSum += p[0];
      lonSum += p[1];
    } else {
      latSum += p.lat;
      lonSum += p.lng;
    }
  });
  return { lat: latSum / count, lon: lonSum / count };
};

// Helper to determine a polygon's color based on its value and rules
export const getColorFromRules = (value: number | undefined, rules: ColorRule[]): string => {
  if (value === undefined) {
    return '#808080'; // Default grey for no data
  }

  // A simple rule engine. You can make this more robust.
  for (const rule of rules) {
    switch (rule.operator) {
      case '<':
        if (value < rule.value) return rule.color;
        break;
      case '>':
        if (value > rule.value) return rule.color;
        break;
      case '<=':
        if (value <= rule.value) return rule.color;
        break;
      case '>=':
        if (value >= rule.value) return rule.color;
        break;
      case '=':
        if (value === rule.value) return rule.color;
        break;
    }
  }

  return '#808080'; // Default color if no rules match
};