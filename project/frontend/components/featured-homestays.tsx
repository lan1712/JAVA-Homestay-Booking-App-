import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HomestayCard } from "@/components/homestay-card"

export default function FeaturedHomestays() {
  // This would be fetched from the API in a real application
  const featuredHomestays = [
    {
      id: 1,
      name: "Mountain View Retreat",
      location: "Sapa, Vietnam",
      price: 65,
      rating: 4.9,
      imageUrl: "/placeholder.svg?height=300&width=400&text=Mountain+View",
    },
    {
      id: 2,
      name: "Beachfront Paradise",
      location: "Da Nang, Vietnam",
      price: 85,
      rating: 4.8,
      imageUrl: "/placeholder.svg?height=300&width=400&text=Beachfront",
    },
    {
      id: 3,
      name: "Traditional Village Home",
      location: "Hoi An, Vietnam",
      price: 55,
      rating: 4.7,
      imageUrl: "/placeholder.svg?height=300&width=400&text=Village+Home",
    },
    {
      id: 4,
      name: "Riverside Bungalow",
      location: "Mekong Delta, Vietnam",
      price: 70,
      rating: 4.6,
      imageUrl: "/placeholder.svg?height=300&width=400&text=Riverside",
    },
  ]

  return (
    <section className="container mx-auto px-4">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Featured Homestays</h2>
          <p className="mt-2 text-muted-foreground">Discover our most popular and highly-rated homestays</p>
        </div>
        <Link href="/homestays">
          <Button variant="outline">View All</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredHomestays.map((homestay) => (
          <HomestayCard
            key={homestay.id}
            id={homestay.id}
            name={homestay.name}
            location={homestay.location}
            price={homestay.price}
            rating={homestay.rating}
            imageUrl={homestay.imageUrl}
          />
        ))}
      </div>
    </section>
  )
}
