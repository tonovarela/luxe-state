"use client"

import Image from "next/image"
import Link from "next/link"
import { useTransition } from "react"
import type { Property, PropertyImage } from "@prisma/client"
import { deleteProperty } from "../actions"

type PropertyWithImages = Property & { images: PropertyImage[] }

export default function PropertyRow({ property }: { property: PropertyWithImages }) {
  const [isPending, startTransition] = useTransition()
  const isSold = property.status === "Sold"
  const isPendingStatus = property.status === "Pending"
  
  // Format price helper
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(property.price)

  return (
    <div className="group grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 border-b border-gray-100 hover:bg-background-light transition-colors items-center">
      {/* Property Details */}
      <div className="col-span-12 md:col-span-6 flex gap-4 items-center">
        <div className="relative h-20 w-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
          {property.images[0]?.url ? (
             <Image 
                src={property.images[0].url}
                alt={property.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
             />
          ) : (
            <div className="h-full w-full bg-mosque/10 flex items-center justify-center">
              <span className="material-icons text-mosque/40">home</span>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-bold text-nordic-dark group-hover:text-mosque transition-colors cursor-pointer truncate max-w-[200px] sm:max-w-[300px]">
            {property.title}
          </h3>
          <p className="text-sm text-nordic-muted truncate max-w-[200px] sm:max-w-[300px]">{property.location}</p>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-nordic-muted/80">
            <span className="flex items-center gap-1"><span className="material-icons text-[14px]">bed</span> {property.beds} Beds</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span className="flex items-center gap-1"><span className="material-icons text-[14px]">bathtub</span> {property.baths} Baths</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span>{property.area} sqft</span>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="col-span-6 md:col-span-2">
        <div className="text-base font-semibold text-nordic-dark">{formattedPrice}</div>
        <div className="text-xs text-nordic-muted">Type: {property.type}</div>
      </div>

      {/* Status */}
      <div className="col-span-6 md:col-span-2">
        {isSold ? (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
               <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mr-1.5"></span>
               Sold
            </span>
         ) : isPendingStatus ? (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">
               <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5"></span>
               Pending
            </span>
         ) : (
             <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-hint-green text-mosque border border-mosque/10">
               <span className="w-1.5 h-1.5 rounded-full bg-mosque mr-1.5"></span>
               Active
             </span>
         )}
      </div>

      {/* Actions */}
      <div className="col-span-12 md:col-span-2 flex items-center justify-end gap-2">
        <Link href={`/admin/properties/${property.id}/edit`} className="p-2 rounded-lg text-nordic-muted/60 hover:text-mosque hover:bg-hint-green transition-all tooltip-trigger" title="Edit Property">
          <span className="material-icons text-xl">edit</span>
        </Link>
        <button
          disabled={isPending}
          onClick={() => {
            if (confirm(`Are you sure you want to delete "${property.title}"? This action cannot be undone.`)) {
              startTransition(async () => {
                try {
                  await deleteProperty(property.id)
                } catch (err: any) {
                  alert(err.message || 'Failed to delete property')
                }
              })
            }
          }}
          className="p-2 rounded-lg text-nordic-muted/60 hover:text-red-600 hover:bg-red-50 transition-all tooltip-trigger disabled:opacity-40 disabled:cursor-not-allowed"
          title="Delete Property"
        >
          <span className="material-icons text-xl">{isPending ? 'hourglass_empty' : 'delete_outline'}</span>
        </button>
      </div>
    </div>
  )
}
