"use client"

import { useState, useRef, useTransition } from "react"
import { useRouter } from "next/navigation"
import { saveProperty } from "../actions"
import type { Property, PropertyImage } from "@prisma/client"

type PropertyWithImages = Property & { images: PropertyImage[] }

export default function PropertyForm({ property }: { property?: PropertyWithImages }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  
  // State for tracking selected images for upload preview
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isEditing = !!property

  // Handle local state increments
  const [beds, setBeds] = useState(property?.beds || 0)
  const [baths, setBaths] = useState(property?.baths || 0)
  const [area, setArea] = useState(property?.area || 0)
  const [descLength, setDescLength] = useState(property?.description?.length || 0)

  // Handle Drag & Drop
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setSelectedImages(prev => [...prev, ...filesArray])
    }
  }

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    
    // Append manually controlled states
    formData.set("beds", beds.toString())
    formData.set("baths", baths.toString())
    formData.set("area", area.toString())
    
    // Append images
    selectedImages.forEach(file => {
      formData.append("images", file)
    })

    startTransition(async () => {
      try {
        const result = await saveProperty(property?.id || null, formData)
        if (result.success) {
          router.push("/admin/properties")
          router.refresh()
        }
      } catch (error: any) {
        alert(error.message || "Failed to save property")
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
      {/* Header hidden in the actual HTML, we keep it in page.tsx */}

      {/* Main Content (8 cols) */}
      <div className="xl:col-span-8 space-y-8">
        
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-hint-green/30 flex items-center gap-3 bg-gradient-to-r from-hint-green/10 to-transparent">
            <div className="w-8 h-8 rounded-full bg-hint-green flex items-center justify-center text-nordic-dark">
              <span className="material-icons text-lg">info</span>
            </div>
            <h2 className="text-xl font-bold text-nordic-dark">Basic Information</h2>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="group">
              <label className="block text-sm font-medium text-nordic-dark mb-1.5 font-display" htmlFor="title">Property Title <span className="text-red-500">*</span></label>
              <input 
                 required
                 defaultValue={property?.title}
                 name="title"
                 id="title"
                 className="w-full text-base px-4 py-2.5 rounded-md border-gray-200 bg-white text-nordic-dark placeholder-gray-400 focus:ring-1 focus:ring-mosque focus:border-mosque transition-all font-display" 
                 placeholder="e.g. Modern Penthouse with Ocean View" 
                 type="text"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-nordic-dark mb-1.5 font-display" htmlFor="price">Price <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-display text-sm">$</span>
                  <input 
                    required
                    defaultValue={property?.price}
                    name="price"
                    id="price"
                    step="0.01"
                    min="0"
                    className="w-full pl-7 pr-4 py-2.5 rounded-md border-gray-200 bg-white text-nordic-dark placeholder-gray-400 focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-base font-medium font-display" 
                    placeholder="0.00" 
                    type="number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-nordic-dark mb-1.5 font-display" htmlFor="status">Status</label>
                <select 
                  name="status"
                  id="status"
                  defaultValue={property?.status || "For Sale"}
                  className="w-full px-4 py-2.5 rounded-md border-gray-200 bg-white text-nordic-dark focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-base font-display cursor-pointer"
                >
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                  <option value="Pending">Pending</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-nordic-dark mb-1.5 font-display" htmlFor="type">Property Type</label>
                <select 
                  name="type"
                  id="type"
                  defaultValue={property?.type || "Villa"}
                  className="w-full px-4 py-2.5 rounded-md border-gray-200 bg-white text-nordic-dark focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-base font-display cursor-pointer"
                >
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-hint-green/30 flex items-center gap-3 bg-gradient-to-r from-hint-green/10 to-transparent">
            <div className="w-8 h-8 rounded-full bg-hint-green flex items-center justify-center text-nordic-dark">
              <span className="material-icons text-lg">description</span>
            </div>
            <h2 className="text-xl font-bold text-nordic-dark">Description</h2>
          </div>
          <div className="p-8">
            <div className="mb-3 flex gap-2 border-b border-gray-100 pb-2">
              <button disabled className="p-1.5 text-gray-400 hover:text-nordic-dark hover:bg-gray-50 rounded transition-colors" type="button"><span className="material-icons text-lg">format_bold</span></button>
              <button disabled className="p-1.5 text-gray-400 hover:text-nordic-dark hover:bg-gray-50 rounded transition-colors" type="button"><span className="material-icons text-lg">format_italic</span></button>
              <button disabled className="p-1.5 text-gray-400 hover:text-nordic-dark hover:bg-gray-50 rounded transition-colors" type="button"><span className="material-icons text-lg">format_list_bulleted</span></button>
            </div>
            <textarea 
              name="description"
              id="description"
              defaultValue={property?.description || ""}
              onChange={(e) => setDescLength(e.target.value.length)}
              maxLength={2000}
              className="w-full px-4 py-3 rounded-md border-gray-200 bg-white text-nordic-dark placeholder-gray-400 focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-base font-display leading-relaxed resize-y min-h-[200px]" 
              placeholder="Describe the property features, neighborhood, and unique selling points..."
            />
            <div className="mt-2 text-right text-xs text-gray-400 font-display">
                {descLength} / 2000 characters
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-hint-green/30 flex justify-between items-center bg-gradient-to-r from-hint-green/10 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-hint-green flex items-center justify-center text-nordic-dark">
                <span className="material-icons text-lg">image</span>
              </div>
              <h2 className="text-xl font-bold text-nordic-dark">Gallery</h2>
            </div>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded font-display">JPG, PNG, WEBP</span>
          </div>
          
          <div className="p-8">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/50 p-10 text-center hover:bg-hint-green/10 hover:border-mosque/40 transition-colors cursor-pointer group"
            >
              <input 
                 ref={fileInputRef}
                 className="hidden" 
                 multiple 
                 type="file" 
                 accept="image/*"
                 onChange={handleFileSelect}
              />
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-mosque group-hover:scale-110 transition-transform duration-300">
                  <span className="material-icons text-2xl">cloud_upload</span>
                </div>
                <div className="space-y-1">
                  <p className="text-base font-medium text-nordic-dark font-display">Click to browse images</p>
                  <p className="text-xs text-gray-400 font-display">Max file size 5MB per image</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
               {/* Display existing images if Editing, and no new images selected yet */}
               {isEditing && selectedImages.length === 0 && property.images.map((img, i) => (
                  <div key={img.id} className="aspect-square rounded-lg overflow-hidden relative group shadow-sm bg-gray-100">
                    <img alt={img.alt || "Property view"} className="w-full h-full object-cover" src={img.url}/>
                    <div className="absolute inset-0 bg-nordic-dark/60  flex-col items-center justify-center gap-2 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex">
                       <span className="text-white text-xs text-center font-display px-2">Replacing these requires uploading new files</span>
                    </div>
                  </div>
               ))}

               {/* New Selection Previews */}
               {selectedImages.map((file, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden relative group shadow-sm bg-gray-100">
                    <img alt={`Preview ${i}`} className="w-full h-full object-cover" src={URL.createObjectURL(file)}/>
                    <div className="absolute inset-0 bg-nordic-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                      <button 
                         onClick={() => removeImage(i)}
                         type="button" 
                         className="w-8 h-8 rounded-full bg-white text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
                      >
                         <span className="material-icons text-sm">delete</span>
                      </button>
                    </div>
                    {i === 0 && (
                       <span className="absolute top-2 left-2 bg-mosque text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm font-display uppercase tracking-wider">Main</span>
                    )}
                  </div>
               ))}

               {/* Add More Button */}
               <button 
                  onClick={() => fileInputRef.current?.click()}
                  type="button" 
                  className="aspect-square rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:text-mosque hover:border-mosque hover:bg-hint-green/20 transition-all group"
                >
                  <span className="material-icons group-hover:scale-110 transition-transform">add</span>
                  <span className="text-xs mt-1 font-medium font-display">Add More</span>
               </button>
            </div>
          </div>
        </div>

      </div>

      {/* Sidebar Content (4 cols) */}
      <div className="xl:col-span-4 space-y-8">
        
        {/* Location */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-hint-green/30 flex items-center gap-3 bg-gradient-to-r from-hint-green/10 to-transparent">
            <div className="w-8 h-8 rounded-full bg-hint-green flex items-center justify-center text-nordic-dark">
              <span className="material-icons text-lg">place</span>
            </div>
            <h2 className="text-lg font-bold text-nordic-dark">Location</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-nordic-dark mb-1.5 font-display" htmlFor="location">Address</label>
              <input 
                name="location"
                id="location"
                defaultValue={property?.location}
                required
                className="w-full px-4 py-2.5 rounded-md border-gray-200 bg-white text-nordic-dark placeholder-gray-400 focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-sm font-display" 
                placeholder="Street Address, City, Zip" 
                type="text"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-xs font-medium text-nordic-dark mb-1 font-display" htmlFor="latitude">Latitude</label>
                  <input name="latitude" id="latitude" defaultValue={property?.latitude || 37.4419} type="number" step="any" className="w-full px-3 py-2 rounded-md border-gray-200 text-sm font-display"/>
               </div>
               <div>
                  <label className="block text-xs font-medium text-nordic-dark mb-1 font-display" htmlFor="longitude">Longitude</label>
                  <input name="longitude" id="longitude" defaultValue={property?.longitude || -122.1430} type="number" step="any" className="w-full px-3 py-2 rounded-md border-gray-200 text-sm font-display"/>
               </div>
            </div>
            <div className="relative h-48 w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-200 group flex items-center justify-center">
               <span className="text-sm text-gray-500 font-display">Map Component Placeholder</span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
          <div className="px-6 py-4 border-b border-hint-green/30 flex items-center gap-3 bg-gradient-to-r from-hint-green/10 to-transparent">
            <div className="w-8 h-8 rounded-full bg-hint-green flex items-center justify-center text-nordic-dark">
              <span className="material-icons text-lg">straighten</span>
            </div>
            <h2 className="text-lg font-bold text-nordic-dark">Details</h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="group">
                <label className="text-xs text-gray-500 font-medium font-display mb-1 block" htmlFor="area">Area (sqft)</label>
                <input 
                  id="area" 
                  type="number" 
                  min="0"
                  value={area}
                  onChange={e => setArea(parseFloat(e.target.value) || 0)}
                  className="w-full text-left px-3 py-2 rounded border-gray-200 bg-gray-50 text-nordic-dark focus:bg-white focus:ring-1 focus:ring-mosque focus:border-mosque transition-all font-display text-sm" 
                  placeholder="0" 
                />
              </div>
            </div>
            
            <hr className="border-gray-100" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-nordic-dark font-display flex items-center gap-2">
                  <span className="material-icons text-gray-400 text-sm">bed</span> Bedrooms
                </label>
                <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
                  <button onClick={() => setBeds(Math.max(0, beds - 1))} type="button" className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors border-r border-gray-100">-</button>
                  <div className="w-10 text-center flex items-center justify-center text-nordic-dark text-sm font-medium font-display">{beds}</div>
                  <button onClick={() => setBeds(beds + 1)} type="button" className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors border-l border-gray-100">+</button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-nordic-dark font-display flex items-center gap-2">
                  <span className="material-icons text-gray-400 text-sm">shower</span> Bathrooms
                </label>
                <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
                  <button onClick={() => setBaths(Math.max(0, baths - 1))} type="button" className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors border-r border-gray-100">-</button>
                  <div className="w-10 text-center flex items-center justify-center text-nordic-dark text-sm font-medium font-display">{baths}</div>
                  <button onClick={() => setBaths(baths + 1)} type="button" className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors border-l border-gray-100">+</button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-nordic-dark font-display flex items-center gap-2">
                  <span className="material-icons text-gray-400 text-sm">star</span> Featured
                </label>
                <div>
                   <input type="checkbox" name="isFeatured" defaultChecked={property?.isFeatured} className="w-4 h-4 text-mosque border-gray-300 rounded focus:ring-mosque" />
                </div>
              </div>

               <div className="flex items-center justify-between">
                 <label className="text-sm font-medium text-nordic-dark font-display flex items-center gap-2" htmlFor="badge">
                   <span className="material-icons text-gray-400 text-sm">local_offer</span> Badge Text
                 </label>
                 <div>
                   <input name="badge" id="badge" defaultValue={property?.badge || ""} type="text" placeholder="e.g. New" className="w-24 text-center px-2 py-1 border border-gray-200 rounded text-sm"/>
                 </div>
               </div>

            </div>

             <hr className="border-gray-100" />
            
             <div className="flex flex-col gap-3 mt-4">
               <button 
                 disabled={isPending}
                 type="submit" 
                 className="w-full px-5 py-3 rounded-lg bg-mosque hover:bg-nordic-dark text-white font-medium shadow-md transition-all duration-200 flex items-center justify-center gap-2 font-display text-sm disabled:opacity-50"
               >
                 <span className="material-icons text-sm">{isPending ? "hourglass_empty" : "save"}</span>
                 {isPending ? 'Saving...' : 'Save Property'}
               </button>
               <button 
                 onClick={() => router.push('/admin/properties')}
                 type="button" 
                 disabled={isPending}
                 className="w-full px-5 py-3 rounded-lg border border-gray-300 bg-white text-nordic-dark hover:bg-gray-50 transition-colors font-medium font-display text-sm disabled:opacity-50"
               >
                 Cancel
               </button>
             </div>
          </div>
        </div>

      </div>

      {/* Mobile Save Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-xl md:hidden z-40 flex gap-3">
        <button 
          type="button" 
          onClick={() => router.push('/admin/properties')} 
          disabled={isPending}
          className="flex-1 py-3 rounded-lg border border-gray-300 bg-white text-nordic-dark font-medium font-display disabled:opacity-50"
        >
            Cancel
        </button>
        <button 
          type="submit" 
          disabled={isPending}
          className="flex-1 py-3 rounded-lg bg-mosque text-white font-medium font-display flex justify-center items-center gap-2 disabled:opacity-50"
        >
            {isPending ? 'Saving...' : 'Save'}
        </button>
      </div>

    </form>
  )
}
