// src/store/store.ts
import { create } from 'zustand';
import { PolygonData } from '@/types';

interface AppState {
  polygons: PolygonData[];
  selectedTime: Date | null;
  selectedTimeRange: [Date, Date] | null;
  selectedPolygonId: string | null;
  addPolygon: (polygon: Omit<PolygonData, 'id' | 'name'>) => void;
  updatePolygonData: (polygonId: string, data: Partial<PolygonData>) => void;
  deletePolygon: (polygonId: string) => void;
  setTime: (time: Date) => void;
  setTimeRange: (range: [Date, Date]) => void;
  setSelectedPolygonId: (id: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  polygons: [],
  selectedTime: null,
  selectedTimeRange: null,
  selectedPolygonId: null,

  addPolygon: (newPolygon) =>
    set((state) => {
      const newId = `poly-${Date.now()}`;
      const newNamedPolygon: PolygonData = {
        ...newPolygon,
        id: newId,
        name: `Polygon ${state.polygons.length + 1}`,
        rules: [ // Add default rules for immediate feedback
            { id: '1', operator: '<', value: 10, color: 'blue' },
            { id: '2', operator: '>=', value: 10, color: 'red' },
        ]
      };
      return {
        polygons: [...state.polygons, newNamedPolygon],
        selectedPolygonId: newId, // Auto-select the new polygon
      };
    }),

  updatePolygonData: (polygonId, data) =>
    set((state) => ({
      polygons: state.polygons.map((p) =>
        p.id === polygonId ? { ...p, ...data } : p
      ),
    })),

  deletePolygon: (polygonId) =>
    set((state) => ({
      polygons: state.polygons.filter((p) => p.id !== polygonId),
      selectedPolygonId: state.selectedPolygonId === polygonId ? null : state.selectedPolygonId,
    })),

  setTime: (time) => set({ selectedTime: time }),
  setTimeRange: (range) => set({ selectedTimeRange: range }),
  
  setSelectedPolygonId: (id) => set({ selectedPolygonId: id }),
}));