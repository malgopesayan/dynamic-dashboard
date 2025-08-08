// src/api/openMeteo.ts
import { PolygonData } from '@/types';
import { formatDate, getCentroid } from '@/lib/helpers';

export const fetchTemperatureData = async (polygon: PolygonData, time: Date): Promise<number | null> => {
  const { lat, lon } = getCentroid(polygon.points as ([number, number][] | { lat: number; lng: number }[]));
  const date = formatDate(time);
  const { url, field } = polygon.dataSource;

  // Construct the API URL
  const apiUrl = `${url}?latitude=${lat.toFixed(2)}&longitude=${lon.toFixed(2)}&start_date=${date}&end_date=${date}&hourly=${field}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    const data = await response.json();
    
    // The API returns an array for the hourly data. Get the value for the selected hour.
    const hour = time.getHours();
    const value = data?.hourly?.[field]?.[hour];

    return typeof value === 'number' ? value : null;
  } catch (error) {
    console.error('Failed to fetch Open-Meteo data:', error);
    return null;
  }
};