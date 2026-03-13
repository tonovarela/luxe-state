'use client'

import dynamic from 'next/dynamic'

const PropertyMap = dynamic(() => import('./PropertyMap'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-100 animate-pulse rounded-lg flex items-center justify-center">Loading Map...</div>
})

interface MapWrapperProps {
  location: string
  lat: number
  lng: number
}

export default function MapWrapper({ location, lat, lng }: MapWrapperProps) {
  return <PropertyMap location={location} lat={lat} lng={lng} />
}
