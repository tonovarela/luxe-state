import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection"
import FeaturedPropertyCard from "./components/FeaturedPropertyCard"
import PropertyCard from "./components/PropertyCard"
import Pagination from "./components/Pagination"
import { getFeaturedProperties, getMarketProperties } from "@/lib/properties"

interface HomeProps {
  searchParams: Promise<{ page?: string }>
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams
  const currentPage = Math.max(1, parseInt(params.page ?? "1", 10))
  
  const filters = {
    type: params.type,
    search: params.search,
    beds: params.beds ? parseInt(params.beds, 10) : undefined,
    baths: params.baths ? parseInt(params.baths, 10) : undefined,
    minPrice: params.minPrice ? parseInt(params.minPrice, 10) : undefined,
    maxPrice: params.maxPrice ? parseInt(params.maxPrice, 10) : undefined,
  }

  const isFilterActive = !!(filters.type && filters.type !== 'All' || filters.search || filters.beds || filters.baths || filters.minPrice || filters.maxPrice)

  const [featuredProperties, marketResult] = await Promise.all([
    getFeaturedProperties(2),
    getMarketProperties(currentPage, filters),
  ])

  const { data: marketProperties, totalPages } = marketResult

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <HeroSection />

        {!isFilterActive && featuredProperties.length > 0 && (
          <section className="mb-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-light text-nordic-dark">Featured Collections</h2>
                <p className="text-nordic-muted mt-1 text-sm">Curated properties for the discerning eye.</p>
              </div>
              <a className="hidden sm:flex items-center gap-1 text-sm font-medium text-mosque hover:opacity-70 transition-opacity" href="#">
                View all <span className="material-icons text-sm">arrow_forward</span>
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProperties.map((property) => (
                <FeaturedPropertyCard key={property.id} property={property} />
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-light text-nordic-dark">
                {isFilterActive ? "Search Results" : "New in Market"}
              </h2>
              <p className="text-nordic-muted mt-1 text-sm">
                {isFilterActive 
                  ? `Found ${marketResult.count} properties matching your criteria.` 
                  : "Fresh opportunities added this week."}
              </p>
            </div>
            <div className="hidden md:flex bg-white p-1 rounded-lg">
              <button className="px-4 py-1.5 rounded-md text-sm font-medium bg-nordic-dark text-white shadow-sm">All</button>
              <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic-muted hover:text-nordic-dark">Buy</button>
              <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic-muted hover:text-nordic-dark">Rent</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {marketProperties.length > 0 ? (
              marketProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <span className="material-icons text-4xl text-nordic-muted mb-4">search_off</span>
                <p className="text-nordic-muted">No properties found matching your criteria.</p>
              </div>
            )}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </section>
      </main>
    </>
  )
}
