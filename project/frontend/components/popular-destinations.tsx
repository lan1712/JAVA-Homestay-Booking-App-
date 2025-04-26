import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"

export default function PopularDestinations() {
  // This would be fetched from the API in a real application
  const destinations = [
    {
      id: 1,
      name: "Sapa",
      description: "Mountain landscapes and ethnic villages",
      count: 24,
      imageUrl: "/placeholder.svg?height=400&width=600&text=Sapa",
    },
    {
      id: 2,
      name: "Hoi An",
      description: "Ancient town with cultural heritage",
      count: 18,
      imageUrl: "/placeholder.svg?height=400&width=600&text=Hoi+An",
    },
    {
      id: 3,
      name: "Ha Long Bay",
      description: "Stunning limestone islands",
      count: 15,
      imageUrl: "/placeholder.svg?height=400&width=600&text=Ha+Long+Bay",
    },
  ]

  return (
    <section className="container mx-auto px-4">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Popular Destinations</h2>
          <p className="mt-2 text-muted-foreground">Explore our most visited locations</p>
        </div>
        <Link href="/destinations">
          <Button variant="outline">All Destinations</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {destinations.map((destination) => (
          <Link key={destination.id} href={`/destinations/${destination.id}`}>
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <div className="relative h-48 w-full">
                <Image
                  src={destination.imageUrl || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold">{destination.name}</h3>
                <p className="text-sm text-muted-foreground">{destination.description}</p>
                <div className="mt-2 flex items-center text-sm">
                  <MapPin className="mr-1 h-4 w-4 text-teal-600" />
                  <span>{destination.count} homestays</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
