// src/app/page.tsx
'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import TimelineSlider from '@/components/ui/TimelineSlider';
import Sidebar from '@/components/ui/Slidebar/Sidebar';
import ClientOnly from '@/components/ui/ClientOnly';
import { useStore } from '@/store/store';
import { fetchTemperatureData } from '@/api/openMeteo';
import { getColorFromRules } from '@/lib/helpers';

// Dynamically import the map component to avoid SSR issues with Leaflet
const InteractiveMap = dynamic(() => import('@/components/ui/map/InterativeMap'), {
  ssr: false, 
  loading: () => <p style={{textAlign: 'center', flexGrow: 1}}>Loading Map...</p>
});

export default function DashboardPage() {
  const { polygons, selectedTime, updatePolygonData } = useStore();

  // This powerful hook runs whenever time or polygons change.
  // It's the engine of your dashboard's interactivity.
  useEffect(() => {
    const updateAllPolygons = async () => {
      for (const poly of polygons) {
        // Fetch new data from the API
        const value = await fetchTemperatureData(poly, selectedTime!);
        // Determine the color based on the new value and existing rules
        const color = getColorFromRules(value === null ? undefined : value, poly.rules);
        // Update the polygon's state in the global store
        updatePolygonData(poly.id, { currentValue: value, color });
      }
    };

    if (polygons.length > 0 && selectedTime) {
      updateAllPolygons();
    }
  }, [selectedTime, polygons, updatePolygonData]); // Dependency array is key!

  return (
    <ClientOnly fallback={
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f0f2f5'
      }}>
        <h2>Loading Dashboard...</h2>
        <p>Please wait while the application initializes.</p>
      </div>
    }>
      <main style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <TimelineSlider />
        <div style={{ display: 'flex', flexGrow: 1 }}>
          <div style={{ flexGrow: 1 }}>
            <InteractiveMap />
          </div>
          <Sidebar />
        </div>
      </main>
    </ClientOnly>
  );
};