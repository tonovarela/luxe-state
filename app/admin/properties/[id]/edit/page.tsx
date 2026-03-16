import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PropertyForm from '../../components/PropertyForm'

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const property = await prisma.property.findUnique({
    where: { id },
    include: { images: true }
  })

  if (!property) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-8">
        <div className="space-y-4">
          <nav aria-label="Breadcrumb" className="flex">
            <ol className="flex items-center space-x-2 text-sm text-gray-500 font-medium font-display">
              <li><Link className="hover:text-mosque transition-colors" href="/admin/properties">Properties</Link></li>
              <li><span className="material-icons text-xs text-gray-400">chevron_right</span></li>
              <li aria-current="page" className="text-nordic-dark">Edit Property</li>
            </ol>
          </nav>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-nordic-dark tracking-tight mb-2">Edit {property.title}</h1>
            <p className="text-base text-gray-500 max-w-2xl font-normal font-display">
              Modify the details below to update the listing.
            </p>
          </div>
        </div>
      </header>
      
      <PropertyForm property={property} />
    </div>
  )
}
