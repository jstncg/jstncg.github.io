import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const infoRows = [
  { label: 'Location', value: 'San Francisco, CA' },
  { label: 'Learning', value: 'Content creation, machine learning' },
  { label: 'Reading', value: 'Norwegian Wood' },
];

export default function NowSection(): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const sfCoords: L.LatLngExpression = [37.78, -122.42];

      mapInstanceRef.current = L.map(mapRef.current, {
        center: sfCoords,
        zoom: 12,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: true,
        dragging: true,
      });

      L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
      }).addTo(mapInstanceRef.current);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section className="mb-[60px]">
      <h2 className="font-[580] text-text mb-3 opacity-50">Now</h2>
      
      <div className="map-wrapper w-full h-[250px] rounded-lg overflow-hidden mt-4 mb-5">
        <div ref={mapRef} className="w-full h-full" style={{ background: '#17181C' }} />
      </div>

      <div className="flex flex-col gap-2">
        {infoRows.map((row) => (
          <div key={row.label} className="flex items-center gap-4">
            <h3 className="text-text whitespace-nowrap">{row.label}</h3>
            <div className="flex-1 border-b border-dashed" style={{ borderColor: 'rgba(228, 227, 220, 0.4)' }} />
            <h3 className="text-text whitespace-nowrap">{row.value}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
