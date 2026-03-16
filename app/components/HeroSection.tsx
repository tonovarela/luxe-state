"use client"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import FilterModal from "./FilterModal"

export default function HeroSection({ dict = {} }: { dict?: any }) {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const t = {
    title: dict.title || "Find your",
    sanctuary: dict.sanctuary || "sanctuary",
    titleEnd: dict.titleEnd || ".",
    searchPlaceholder: dict.searchPlaceholder || "Search by city, neighborhood, or address...",
    searchButton: dict.searchButton || "Search",
    searching: dict.searching || "...",
    all: dict.all || "All",
    house: dict.house || "House",
    apartment: dict.apartment || "Apartment",
    villa: dict.villa || "Villa",
    penthouse: dict.penthouse || "Penthouse",
    filters: dict.filters || "Filters"
  }

  const currentType = searchParams.get("type") || "All"

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (searchQuery) {
      params.set("search", searchQuery)
    } else {
      params.delete("search")
    }
    params.set("page", "1")
    startTransition(() => {
      router.push(`/?${params.toString()}`)
    })
  }

  const handleTypeFilter = (type: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (type === "All") {
      params.delete("type")
    } else {
      params.set("type", type)
    }
    params.set("page", "1")
    startTransition(() => {
      router.push(`/?${params.toString()}`)
    })
  }

  const types = [
    { value: "House", label: t.house },
    { value: "Apartment", label: t.apartment },
    { value: "Villa", label: t.villa },
    { value: "Penthouse", label: t.penthouse }
  ]

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-nordic-dark leading-tight">
          {t.title}{" "}
          <span className="relative inline-block">
            <span className="relative z-10 font-medium">{t.sanctuary}</span>
            <span className="absolute bottom-2 left-0 w-full h-3 bg-mosque/20 -rotate-1 z-0"></span>
          </span>
          {t.titleEnd}
        </h1>

        <div className="relative group max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-icons text-nordic-muted text-2xl group-focus-within:text-mosque transition-colors">
              search
            </span>
          </div>
          <input
            className="block w-full pl-12 pr-4 py-4 rounded-xl border-none bg-white text-nordic-dark shadow-soft placeholder-nordic-muted/60 focus:ring-2 focus:ring-mosque focus:bg-white transition-all text-lg"
            placeholder={t.searchPlaceholder}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            className="absolute inset-y-2 right-2 px-6 bg-mosque hover:bg-mosque/90 text-white font-medium rounded-lg transition-colors flex items-center justify-center shadow-lg shadow-mosque/20"
          >
            {isPending ? t.searching : t.searchButton}
          </button>
        </div>

        <div className="flex items-center justify-center gap-3 overflow-x-auto hide-scroll py-2 px-4 -mx-4">
          <button 
            onClick={() => handleTypeFilter("All")}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5 ${
              currentType === "All" 
                ? "bg-nordic-dark text-white shadow-lg shadow-nordic-dark/10" 
                : "bg-white border border-nordic-dark/5 text-nordic-muted hover:text-nordic-dark hover:border-mosque/50 hover:bg-mosque/5"
            }`}
          >
            {t.all}
          </button>
          {types.map((type) => (
            <button 
              key={type.value}
              onClick={() => handleTypeFilter(type.value)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all hover:bg-mosque/5 hover:border-mosque/50 ${
                currentType === type.value 
                  ? "bg-nordic-dark text-white shadow-lg shadow-nordic-dark/10" 
                  : "bg-white border border-nordic-dark/5 text-nordic-muted hover:text-nordic-dark"
              }`}
            >
              {type.label}
            </button>
          ))}
          <div className="w-px h-6 bg-nordic-dark/10 mx-2"></div>
          <button 
            onClick={() => setIsFilterModalOpen(true)}
            className="whitespace-nowrap flex items-center gap-1 px-4 py-2 rounded-full text-nordic-dark font-medium text-sm hover:bg-black/5 transition-colors"
          >
            <span className="material-icons text-base">tune</span> {t.filters}
          </button>
        </div>
      </div>

      <FilterModal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)} 
      />
    </section>
  )
}

