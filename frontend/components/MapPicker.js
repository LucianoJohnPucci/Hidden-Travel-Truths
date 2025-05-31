import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';

const containerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: 12,
  marginBottom: 16,
  boxShadow: '0 2px 12px #0369a122',
};

const defaultCenter = [20, 0];

function LocationMarker({ onSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      // Reverse geocode with Nominatim
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json`)
        .then(res => res.json())
        .then(data => {
          let city = data.address.city || data.address.town || data.address.village || '';
          let country = data.address.country || '';
          onSelect(city && country ? `${city}, ${country}` : data.display_name);
        });
    }
  });

  return position ? <Marker position={position} /> : null;
}

export default function MapPicker({ onPlaceSelect }) {
  return (
    <div style={containerStyle}>
      <MapContainer center={defaultCenter} zoom={2} style={{ width: '100%', height: '100%', borderRadius: 12 }} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onSelect={onPlaceSelect} />
      </MapContainer>
    </div>
  );
}
