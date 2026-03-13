"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [beds, setBeds] = useState(parseInt(searchParams.get("beds") || "0", 10))
  const [baths, setBaths] = useState(parseInt(searchParams.get("baths") || "0", 10))
  const [propertyType, setPropertyType] = useState(searchParams.get("type") || "Any Type")
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "")

  // Sync state with URL when modal opens
  useEffect(() => {
    if (isOpen) {
      setBeds(parseInt(searchParams.get("beds") || "0", 10))
      setBaths(parseInt(searchParams.get("baths") || "0", 10))
      setPropertyType(searchParams.get("type") || "Any Type")
      setMinPrice(searchParams.get("minPrice") || "")
      setMaxPrice(searchParams.get("maxPrice") || "")
    }
  }, [isOpen, searchParams])

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleShowResults = () => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (beds > 0) params.set("beds", beds.toString())
    else params.delete("beds")
    
    if (baths > 0) params.set("baths", baths.toString())
    else params.delete("baths")
    
    if (propertyType !== "Any Type") params.set("type", propertyType)
    else params.delete("type")
    
    if (minPrice) params.set("minPrice", minPrice.replace(/[^0-9]/g, ""))
    else params.delete("minPrice")
    
    if (maxPrice) params.set("maxPrice", maxPrice.replace(/[^0-9]/g, ""))
    else params.delete("maxPrice")
    
    params.set("page", "1")
    router.push(`/?${params.toString()}`)
    onClose()
  }

  const handleClearAll = () => {
    setBeds(0)
    setBaths(0)
    setPropertyType("Any Type")
    setMinPrice("")
    setMaxPrice("")
    router.push("/")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Modal Overlay */}
      <div 
        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-0 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Main Modal Container */}
      <main className="relative z-10 w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <header className="px-8 py-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900 sticky top-0 z-30">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Filters</h1>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
          >
            <span className="material-icons">close</span>
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-10">
          {/* Section 1: Location */}
          <section>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Location</label>
            <div className="relative group">
              <span className="material-icons absolute left-4 top-3.5 text-gray-400 group-focus-within:text-mosque transition-colors">location_on</span>
              <input 
                className="w-full pl-12 pr-4 py-3 bg-[#f5f8f6] dark:bg-gray-800 border-0 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#006611] focus:bg-white dark:focus:bg-gray-800 transition-all shadow-sm" 
                placeholder="City, neighborhood, or address" 
                type="text" 
                defaultValue={searchParams.get("search") || ""}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams.toString())
                  if (e.target.value) params.set("search", e.target.value)
                  else params.delete("search")
                }}
              />
            </div>
          </section>

          {/* Section 2: Price Range */}
          <section>
            <div className="flex justify-between items-end mb-4">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price Range</label>
              <span className="text-sm font-medium text-[#006611]">
                {minPrice || maxPrice ? `$${minPrice || '0'} – $${maxPrice || 'Any'}` : 'Any Price'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#f5f8f6] dark:bg-gray-800 p-3 rounded-lg border border-transparent focus-within:border-[#006611]/30 transition-colors">
                <label className="block text-[10px] text-gray-500 uppercase font-medium mb-1">Min Price</label>
                <div className="flex items-center">
                  <span className="text-gray-400 mr-1">$</span>
                  <input 
                    className="w-full bg-transparent border-0 p-0 text-gray-900 dark:text-white font-medium focus:ring-0 text-sm" 
                    type="text" 
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="bg-[#f5f8f6] dark:bg-gray-800 p-3 rounded-lg border border-transparent focus-within:border-[#006611]/30 transition-colors">
                <label className="block text-[10px] text-gray-500 uppercase font-medium mb-1">Max Price</label>
                <div className="flex items-center">
                  <span className="text-gray-400 mr-1">$</span>
                  <input 
                    className="w-full bg-transparent border-0 p-0 text-gray-900 dark:text-white font-medium focus:ring-0 text-sm" 
                    type="text" 
                    placeholder="Any"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Property Details */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Property Type */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Property Type</label>
              <div className="relative">
                <select 
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-[#f5f8f6] dark:bg-gray-800 border-0 rounded-lg py-3 pl-4 pr-10 text-gray-900 dark:text-white appearance-none focus:ring-2 focus:ring-[#006611] cursor-pointer"
                >
                  <option>Any Type</option>
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Penthouse</option>
                  <option>Condo</option>
                  <option>Townhouse</option>
                </select>
                <span className="material-icons absolute right-3 top-3 text-gray-400 pointer-events-none">expand_more</span>
              </div>
            </div>
            {/* Rooms */}
            <div className="space-y-4">
              {/* Beds */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Bedrooms</span>
                <div className="flex items-center space-x-3 bg-[#f5f8f6] dark:bg-gray-800 rounded-full p-1">
                  <button 
                    onClick={() => setBeds(Math.max(0, beds - 1))}
                    className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center text-gray-500 hover:text-[#006611] disabled:opacity-50 transition-colors"
                  >
                    <span className="material-icons text-base">remove</span>
                  </button>
                  <span className="text-sm font-semibold w-4 text-center">{beds}+</span>
                  <button 
                    onClick={() => setBeds(beds + 1)}
                    className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center text-[#006611] hover:bg-[#006611] hover:text-white transition-colors"
                  >
                    <span className="material-icons text-base">add</span>
                  </button>
                </div>
              </div>
              {/* Baths */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Bathrooms</span>
                <div className="flex items-center space-x-3 bg-[#f5f8f6] dark:bg-gray-800 rounded-full p-1">
                  <button 
                    onClick={() => setBaths(Math.max(0, baths - 1))}
                    className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center text-gray-500 hover:text-[#006611] transition-colors"
                  >
                    <span className="material-icons text-base">remove</span>
                  </button>
                  <span className="text-sm font-semibold w-4 text-center">{baths}+</span>
                  <button 
                    onClick={() => setBaths(baths + 1)}
                    className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center text-[#006611] hover:bg-[#006611] hover:text-white transition-colors"
                  >
                    <span className="material-icons text-base">add</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Amenities */}
          <section>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Amenities & Features</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <AmenityChip icon="pool" label="Swimming Pool" defaultChecked />
              <AmenityChip icon="fitness_center" label="Gym" />
              <AmenityChip icon="local_parking" label="Parking" />
              <AmenityChip icon="ac_unit" label="Air Conditioning" />
              <AmenityChip icon="wifi" label="High-speed Wifi" defaultChecked />
              <AmenityChip icon="deck" label="Patio / Terrace" />
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-8 py-6 sticky bottom-0 z-30 flex items-center justify-between">
          <button 
            onClick={handleClearAll}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors underline decoration-gray-300 underline-offset-4"
          >
            Clear all filters
          </button>
          <button 
            onClick={handleShowResults}
            className="bg-[#006611] hover:bg-[#006611]/90 text-white px-8 py-3 rounded-lg font-medium shadow-lg shadow-[#006611]/30 transition-all hover:shadow-[#006611]/40 flex items-center gap-2 transform active:scale-95"
          >
            Show Results
            <span className="material-icons text-sm">arrow_forward</span>
          </button>
        </footer>
      </main>
    </div>
  )
}

function AmenityChip({ icon, label, defaultChecked = false }: { icon: string, label: string, defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked)
  
  return (
    <label className="cursor-pointer group relative">
      <input 
        checked={checked} 
        onChange={() => setChecked(!checked)}
        className="peer sr-only" 
        type="checkbox"
      />
      <div className={`h-full px-4 py-3 rounded-lg border font-medium text-sm flex items-center justify-center gap-2 transition-all 
        ${checked 
          ? "border-[#006611] bg-[#006611]/10 text-[#006611]" 
          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
        }`}
      >
        <span className={`material-icons text-lg ${checked ? "text-[#006611]" : "text-gray-400 group-hover:text-gray-500"}`}>{icon}</span>
        {label}
      </div>
      {checked && <div className="absolute top-2 right-2 w-2 h-2 bg-[#006611] rounded-full opacity-100 transition-opacity"></div>}
    </label>
  )
}
