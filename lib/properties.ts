import { PrismaClient } from '@prisma/client'
import { type Property } from '@/app/types'

const prisma = new PrismaClient()

const PAGE_SIZE = 8

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(row: any): Property {
  return {
    id: row.id,
    title: row.title,
    location: row.location,
    price: row.price,
    beds: row.beds,
    baths: row.baths,
    area: row.area,
    badge: row.badge,
    type: row.type,
    status: row.status as Property['status'],
    isFeatured: row.isFeatured,
    latitude: row.latitude,
    longitude: row.longitude,
    slug: row.slug,
    images: row.images || [],
  }
}

export async function getFeaturedProperties(limit: number = 2): Promise<Property[]> {
  const data = await prisma.property.findMany({
    where: { isFeatured: true },
    include: { images: true },
    orderBy: { id: 'asc' },
    take: limit,
  })
  return data.map(mapRow)
}

export interface PaginatedProperties {
  data: Property[]
  count: number
  totalPages: number
  currentPage: number
}

export interface PropertyFilters {
  type?: string
  search?: string
  beds?: number
  baths?: number
  minPrice?: number
  maxPrice?: number
}

export async function getMarketProperties(
  page: number = 1,
  filters: PropertyFilters = {}
): Promise<PaginatedProperties> {
  const skip = (page - 1) * PAGE_SIZE

  const where: any = { isFeatured: false }

  if (filters.type && filters.type !== 'All') {
    where.type = filters.type
  }

  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search } },
      { location: { contains: filters.search } },
    ]
  }

  if (filters.beds) where.beds = { gte: filters.beds }
  if (filters.baths) where.baths = { gte: filters.baths }
  
  if (filters.minPrice || filters.maxPrice) {
    where.price = {}
    if (filters.minPrice) where.price.gte = filters.minPrice
    if (filters.maxPrice) where.price.lte = filters.maxPrice
  }

  const [data, total] = await Promise.all([
    prisma.property.findMany({
      where,
      include: { images: true },
      orderBy: { createdAt: 'desc' },
      skip,
      take: PAGE_SIZE,
    }),
    prisma.property.count({ where }),
  ])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return {
    data: data.map(mapRow),
    count: total,
    totalPages,
    currentPage: page,
  }
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const data = await prisma.property.findUnique({
    where: { slug },
    include: { images: true },
  })
  
  if (!data) return null
  
  return mapRow(data)
}
