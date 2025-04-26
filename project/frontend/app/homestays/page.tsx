import { HomestayCard } from "@/components/homestay-card"
import { HomestayFilters } from "@/components/homestay-filters"
import { Separator } from "@/components/ui/separator"

export default function HomestaysPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Find Your Perfect Homestay</h1>
        <p className="mt-2 text-muted-foreground">Discover unique places to stay with local hosts around the world</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <HomestayFilters />
        </div>

        <div className="md:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Showing 12 results</p>
            <div className="flex items-center gap-2">
              <span className="text-sm">Sort by:</span>
              <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Highest Rated</option>
              </select>
            </div>
          </div>

          <Separator className="mb-6" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <HomestayCard
                key={i}
                id={i + 1}
                name={`Beautiful Homestay ${i + 1}`}
                location={["Hanoi", "Da Nang", "Ho Chi Minh City", "Hoi An", "Sapa"][i % 5]}
                price={50 + i * 10}
                rating={4 + (i % 2) * 0.5}
                imageUrl={`/placeholder.svg?height=300&width=400&text=Homestay+${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
