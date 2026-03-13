export type Property = {
  id: string
  title: string
  location: string
  price: number
  beds: number
  baths: number
  area: number
  badge: string
  type: string
  status: "For Sale" | "For Rent"
  slug: string
  images: {
    id: string
    url: string
    alt: string | null
  }[]
  latitude: number
  longitude: number
  isFeatured?: boolean
}
