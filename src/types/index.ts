// src/types/index.ts
import type { LatLngExpression } from 'leaflet';

export interface ColorRule {
  id: string;
  operator: '=' | '<' | '>' | '<=' | '>=';
  value: number;
  color: string;
}

export interface PolygonData {
  id: string;
  name: string;
  points: LatLngExpression[];
  dataSource: {
    url: string;
    field: string;
  };
  rules: ColorRule[];
  currentValue?: number | null; // The fetched value from the API
  color?: string;        // The calculated color based on rules
}