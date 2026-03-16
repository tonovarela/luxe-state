import { prisma } from "@/lib/prisma"
import PropertyRow from "./components/PropertyRow"
import Link from "next/link"

export default async function AdminPropertiesPage(props: {
  searchParams?: Promise<{
    page?: string
  }>
}) {
  const searchParams = await props.searchParams
  const page = Number(searchParams?.page) || 1
  const pageSize = 10
  const skip = (page - 1) * pageSize

  // Fetch paginated properties and total count
  const [properties, totalCount, allProperties] = await Promise.all([
    prisma.property.findMany({
      skip,
      take: pageSize,
      include: {
        images: true,
      },
      orderBy: {
        createdAt: "desc"
      }
    }),
    prisma.property.count(),
    prisma.property.findMany({ select: { status: true } }) // Needed for total active/pending counts
  ])

  // Calculate synthetic stats based on all properties
  const active = allProperties.filter(p => p.status !== "Sold" && p.status !== "Pending").length
  const pending = allProperties.filter(p => p.status === "Pending").length

  const totalPages = Math.ceil(totalCount / pageSize)
  const isFirstPage = page === 1
  const isLastPage = page >= totalPages
  
  const currentStart = totalCount === 0 ? 0 : skip + 1;
  const currentEnd = Math.min(skip + pageSize, totalCount);

  return (
    <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-nordic-dark tracking-tight">My Properties</h1>
          <p className="text-nordic-muted mt-1">Manage your portfolio and track performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-gray-200 text-nordic-dark hover:bg-gray-50 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm inline-flex items-center gap-2">
            <span className="material-icons text-base">filter_list</span> Filter
          </button>
          <button className="bg-mosque hover:bg-mosque/90 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-md shadow-mosque/20 transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2">
            <span className="material-icons text-base">add</span> Add New Property
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl border border-mosque/10 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-nordic-muted">Total Listings</p>
            <p className="text-2xl font-bold text-nordic-dark mt-1">{totalCount}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-mosque/10 flex items-center justify-center text-mosque">
            <span className="material-icons">apartment</span>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-mosque/10 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-nordic-muted">Active Properties</p>
            <p className="text-2xl font-bold text-nordic-dark mt-1">{active}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-hint-green flex items-center justify-center text-mosque">
            <span className="material-icons">check_circle</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-mosque/10 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-nordic-muted">Pending Sale</p>
            <p className="text-2xl font-bold text-nordic-dark mt-1">{pending}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <span className="material-icons">pending</span>
          </div>
        </div>
      </div>

      {/* Property List Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50/50 border-b border-gray-100 text-xs font-semibold text-nordic-muted uppercase tracking-wider">
          <div className="col-span-6">Property Details</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Rows */}
        {properties.length === 0 ? (
          <div className="px-6 py-10 text-center text-nordic-muted">
             No properties found
          </div>
        ) : (
          <div className="flex flex-col">
            {properties.map(property => (
              <PropertyRow key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="text-sm text-nordic-muted">
              Showing <span className="font-medium text-nordic-dark">{currentStart}</span> to <span className="font-medium text-nordic-dark">{currentEnd}</span> of <span className="font-medium text-nordic-dark">{totalCount}</span> results
          </div>
          <div className="flex gap-2">
            {isFirstPage ? (
               <button className="px-3 py-1 text-sm border border-gray-200 rounded-md text-nordic-muted opacity-50 cursor-not-allowed" disabled>Previous</button>
            ) : (
               <Link href={`/admin/properties?page=${page - 1}`} className="px-3 py-1 text-sm border border-gray-200 rounded-md text-nordic-muted hover:bg-white hover:text-nordic-dark transition-colors">Previous</Link>
            )}
            
            {isLastPage ? (
               <button className="px-3 py-1 text-sm border border-gray-200 rounded-md text-nordic-muted opacity-50 cursor-not-allowed" disabled>Next</button>
            ) : (
               <Link href={`/admin/properties?page=${page + 1}`} className="px-3 py-1 text-sm border border-gray-200 rounded-md text-nordic-muted hover:bg-white hover:text-nordic-dark transition-colors">Next</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
