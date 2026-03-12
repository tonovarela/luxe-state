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
    imageUrl: row.imageUrl,
    badge: row.badge,
    type: row.type,
    status: row.status as Property['status'],
    isFeatured: row.isFeatured,
  }
}

export async function getFeaturedProperties(): Promise<Property[]> {
  const data = await prisma.property.findMany({
    where: { isFeatured: true },
    orderBy: { id: 'asc' },
  })
  return data.map(mapRow)
}

export interface PaginatedProperties {
  data: Property[]
  count: number
  totalPages: number
  currentPage: number
}

export async function getMarketProperties(
  page: number = 1
): Promise<PaginatedProperties> {
  const skip = (page - 1) * PAGE_SIZE

  const [data, total] = await Promise.all([
    prisma.property.findMany({
      where: { isFeatured: false },
      orderBy: { createdAt: 'asc' },
      skip,
      take: PAGE_SIZE,
    }),
    prisma.property.count({ where: { isFeatured: false } }),
  ])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return {
    data: data.map(mapRow),
    count: total,
    totalPages,
    currentPage: page,
  }
}
