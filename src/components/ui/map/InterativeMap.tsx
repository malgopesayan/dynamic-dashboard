// src/components/map/InteractiveMap.tsx
'use client';

import React from 'react';
import { MapContainer, TileLayer, Polygon, FeatureGroup, Tooltip } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { useStore } from '@/store/store';
import L from 'leaflet';
import type { LatLngExpression } from 'leaflet';

// FIX: Default icon issue with Webpack
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


const InteractiveMap = () => {
  const { polygons, addPolygon, setSelectedPolygonId } = useStore();
  
  // React-Leaflet-Draw does not ship TS types for the event;
  // declare the minimal shape we need to avoid 'any'.
  const handleCreate = (e: { layer: L.Polygon }) => {
    const polygonLayer = e.layer;
    const firstRing = (polygonLayer.getLatLngs() as L.LatLng[][])[0];

    addPolygon({
      points: firstRing as unknown as LatLngExpression[],
      dataSource: {
        url: 'https://archive-api.open-meteo.com/v1/archive',
        field: 'temperature_2m',
      },
      rules: [], // Will be populated by default in the store
    });
  };

  return (
    <MapContainer center={[52.52, 13.41]} zoom={7} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={handleCreate}
          draw={{
            rectangle: false, circle: false, circlemarker: false, marker: false, polyline: false,
          }}
        />
      </FeatureGroup>

      {polygons.map((poly) => (
        <Polygon 
          key={poly.id} 
          positions={poly.points} 
          pathOptions={{ color: 'black', weight: 1, fillColor: poly.color, fillOpacity: 0.6 }}
          eventHandlers={{
            click: () => {
              setSelectedPolygonId(poly.id);
            },
          }}
        >
          <Tooltip>
            <b>{poly.name}</b><br/>
            {typeof poly.currentValue === 'number' ? `${poly.dataSource.field}: ${poly.currentValue.toFixed(2)}` : 'Loading...'}
          </Tooltip>
        </Polygon>
      ))}
    </MapContainer>
  );
};

export default InteractiveMap;