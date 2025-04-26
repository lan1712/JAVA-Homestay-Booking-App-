import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MapPin, Star } from "lucide-react"

interface HomestayCardProps {
  id: number
  name: string
  location: string
  price: number
  rating: number
  imageUrl: string
}

export function HomestayCard({ id, name, location, price, rating, imageUrl }: HomestayCardProps) {
  return (
    <Link href={`/homestays/${id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-amber-500" />
              <span className="text-sm">{rating}</span>
            </div>
          </div>
          <h3 className="mt-2 text-lg font-semibold">{name}</h3>
        </CardContent>
        <CardFooter className="border-t p-4">
          <p className="text-lg font-bold">
            ${price} <span className="text-sm font-normal text-muted-foreground">/ night</span>
          </p>
        </CardFooter>
      </Card>
    </Link>
  )
}
