'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'

// Fix for default marker icon in Leaflet + Next.js
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

interface PropertyMapProps {
  location: string
  // For demo purposes, we'll use fixed coordinates or mock geocoding
  lat?: number
  lng?: number
}

export default function PropertyMap({ location, lat = 37.4419, lng = -122.1430 }: PropertyMapProps) {
  return (
    <div className="w-full h-full min-h-[300px] relative z-0">
      <MapContainer 
        key={`${lat}-${lng}`}
        center={[lat, lng]} 
        zoom={13} 
        scrollWheelZoom={false} 
        className="h-full w-full rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>
            {location}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
