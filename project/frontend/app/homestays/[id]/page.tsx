"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Star } from "lucide-react"
import BookingForm from "@/components/booking-form"
import HomestayGallery from "@/components/homestay-gallery"
import AmenityList from "@/components/amenity-list"
import ReviewList from "@/components/review-list"
import { useToast } from "@/components/ui/use-toast"

interface HomestayDetail {
  id: number
  name: string
  location: string
  description: string
  price: number
  mainImageUrl: string
  isFeatured: boolean
  images: {
    id: number
    url: string
    isPrimary: boolean
  }[]
  amenities: {
    id: number
    name: string
    icon: string
    category: string
  }[]
  averageRating: number
  reviewCount: number
}

interface Review {
  id: number
  userName: string
  rating: number
  comment: string
  createdAt: string
}

export default function HomestayDetailPage({ params }: { params: { id: string } }) {
  const homestayId = params.id
  const { toast } = useToast()

  const [homestay, setHomestay] = useState<HomestayDetail | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHomestayDetails = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/homestays/${homestayId}`)
        // const data = await response.json()

        // For now, we'll use mock data
        setTimeout(() => {
          setHomestay({
            id: Number(homestayId),
            name: "Charming Mountain Retreat",
            location: "Sapa, Vietnam",
            description:
              "Experience the beauty of Sapa in this traditional homestay with breathtaking mountain views. Our family-owned property offers authentic local cuisine, cultural experiences, and comfortable accommodations.",
            price: 75,
            mainImageUrl: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
            isFeatured: true,
            images: [
              { id: 1, url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b", isPrimary: false },
              { id: 2, url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470", isPrimary: false },
              { id: 3, url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8", isPrimary: false },
              { id: 4, url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470", isPrimary: false },
            ],
            amenities: [
              { id: 1, name: "Free WiFi", icon: "wifi", category: "BASIC" },
              { id: 2, name: "Air Conditioning", icon: "air-conditioning", category: "BASIC" },
              { id: 3, name: "Hot Water", icon: "hot-water", category: "BASIC" },
              { id: 4, name: "Private Bathroom", icon: "bathroom", category: "FACILITY" },
              { id: 5, name: "Mountain View", icon: "mountain", category: "VIEW" },
              { id: 6, name: "Breakfast Included", icon: "breakfast", category: "MEAL" },
              { id: 7, name: "Tour Guide", icon: "guide", category: "SERVICE" },
              { id: 8, name: "Bicycle Rental", icon: "bicycle", category: "SERVICE" },
            ],
            averageRating: 4.8,
            reviewCount: 24,
          })

          setReviews([
            {
              id: 1,
              userName: "Sarah Johnson",
              rating: 5,
              comment:
                "Amazing experience! The host family was incredibly welcoming and taught us so much about local culture. The views were breathtaking and the food was amazing.",
              createdAt: "2023-05-15T14:30:00Z",
            },
            {
              id: 2,
              userName: "David Chen",
              rating: 5,
              comment:
                "This was my first homestay experience and it exceeded all expectations. The authentic local experience was something you can't get at a hotel. I'll definitely be booking through Good Place Travel again!",
              createdAt: "2023-06-20T09:45:00Z",
            },
            {
              id: 3,
              userName: "Maria Garcia",
              rating: 4,
              comment:
                "The homestay was the highlight of our Vietnam trip. The family was so kind and the location was perfect for exploring the area. The home-cooked meals were delicious!",
              createdAt: "2023-07-05T16:20:00Z",
            },
            {
              id: 4,
              userName: "Robert Johnson",
              rating: 5,
              comment:
                "Incredible views and wonderful hosts. They arranged trekking tours for us and taught us about local customs. The rooms were clean and comfortable.",
              createdAt: "2023-08-12T11:10:00Z",
            },
          ])

          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching homestay details:", error)
        toast({
          title: "Error",
          description: "Failed to load homestay details. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchHomestayDetails()
  }, [homestayId, toast])

  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-8">
        <p>Loading homestay details...</p>
      </div>
    )
  }

  if (!homestay) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-8">
        <p>Homestay not found</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{homestay.name}</h1>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{homestay.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-amber-500" />
            <span>{homestay.averageRating}</span>
            <span className="text-muted-foreground">({homestay.reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      <HomestayGallery images={homestay.images} mainImageUrl={homestay.mainImageUrl} />

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="space-y-6">
                <div>
                  <h2 className="mb-4 text-2xl font-semibold">About this homestay</h2>
                  <p className="text-muted-foreground">{homestay.description}</p>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-semibold">Featured Amenities</h3>
                  <AmenityList amenities={homestay.amenities} compact={true} />
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-semibold">The space</h3>
                  <p className="text-muted-foreground">
                    Our homestay features traditional architecture with modern comforts. You'll have a private room with
                    mountain views, access to shared living spaces, and a beautiful garden area perfect for relaxing
                    after a day of exploring.
                  </p>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-semibold">Guest access</h3>
                  <p className="text-muted-foreground">
                    Guests have access to their private room, shared bathroom facilities, common dining area, garden,
                    and outdoor terrace with panoramic views.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="amenities">
              <h2 className="mb-6 text-2xl font-semibold">What this place offers</h2>
              <AmenityList amenities={homestay.amenities} />
            </TabsContent>

            <TabsContent value="reviews">
              <ReviewList reviews={reviews} />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <BookingForm homestayId={homestayId} price={homestay.price} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
