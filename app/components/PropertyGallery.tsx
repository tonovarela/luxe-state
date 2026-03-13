'use client'

import { useState } from 'react'
import Image from 'next/image'

interface PropertyGalleryProps {
  images: {
    id: string
    url: string
    alt: string | null
  }[]
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [activeImage, setActiveImage] = useState(0)

  if (!images || images.length === 0) return null

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Large Image Display */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-md group border border-mosque/10 bg-nordic-dark/5">
        <Image
          alt={images[activeImage].alt || "Property Image"}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
          src={images[activeImage].url}
          fill
          priority
          unoptimized
          sizes="(max-width: 1024px) 100vw, 80vw"
        />
        
        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button 
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-nordic-dark shadow-lg hover:bg-mosque hover:text-white transition-all pointer-events-auto"
          >
            <span className="material-icons">chevron_left</span>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-nordic-dark shadow-lg hover:bg-mosque hover:text-white transition-all pointer-events-auto"
          >
            <span className="material-icons">chevron_right</span>
          </button>
        </div>

        {/* Labels & Overlay Info */}
        <div className="absolute top-4 left-4 flex gap-2 pointer-events-none">
          <span className="bg-mosque text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Premium</span>
          <span className="bg-white/90 backdrop-blur-md text-nordic-dark text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Verified</span>
        </div>
        
        {/* Photos Counter */}
        <div className="absolute bottom-4 right-4 bg-nordic-dark/60 text-white px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm border border-white/10 flex items-center gap-1.5 shadow-xl transition-all">
          <span className="material-icons text-sm">photo_library</span>
          {activeImage + 1} / {images.length}
        </div>
      </div>
      
      {/* Thumbnail Strip */}
      <div className="flex gap-4 overflow-x-auto hide-scroll pb-4 snap-x relative scroll-smooth">
        {images.map((image, index) => (
          <div
            key={image.id || index}
            onClick={() => setActiveImage(index)}
            className={`flex-none w-40 aspect-[4/3] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 snap-start relative border-2 ${
              activeImage === index 
                ? 'border-mosque opacity-100' 
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                alt={image.alt || `Property Thumbnail ${index + 1}`}
                className={`w-full h-full object-cover transition-all duration-500`}
                src={image.url}
                fill
                unoptimized
                sizes="160px"
              />
              {activeImage === index && (
                <div className="absolute inset-0 bg-mosque/10 pointer-events-none transition-opacity duration-300"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
