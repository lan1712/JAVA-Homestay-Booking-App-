import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function TestimonialsSection() {
  // This would be fetched from the API in a real application
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "United States",
      text: "Our stay at the mountain homestay was incredible! The host family was so welcoming and taught us so much about local culture. The views were breathtaking and the food was amazing.",
      rating: 5,
      imageUrl: "/placeholder.svg?height=100&width=100&text=SJ",
    },
    {
      id: 2,
      name: "David Chen",
      location: "Australia",
      text: "This was my first homestay experience and it exceeded all expectations. The authentic local experience was something you can't get at a hotel. I'll definitely be booking through Good Place Travel again!",
      rating: 5,
      imageUrl: "/placeholder.svg?height=100&width=100&text=DC",
    },
    {
      id: 3,
      name: "Maria Garcia",
      location: "Spain",
      text: "The riverside homestay was the highlight of our Vietnam trip. The family was so kind and the location was perfect for exploring the area. The home-cooked meals were delicious!",
      rating: 4,
      imageUrl: "/placeholder.svg?height=100&width=100&text=MG",
    },
  ]

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">What Our Guests Say</h2>
          <p className="mt-2 text-muted-foreground">Real experiences from travelers who have stayed at our homestays</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="mb-6 text-muted-foreground">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                    <img
                      src={testimonial.imageUrl || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
