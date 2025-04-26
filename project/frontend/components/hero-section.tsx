import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"

export default function HeroSection() {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=800&width=1600&text=Beautiful+Landscape')",
          filter: "brightness(0.7)",
        }}
      />
      <div className="relative flex min-h-[600px] flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="mb-4 max-w-3xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          Discover Authentic Homestay Experiences
        </h1>
        <p className="mb-8 max-w-2xl text-lg md:text-xl">
          Immerse yourself in local culture with unique accommodations and unforgettable experiences
        </p>

        <div className="w-full max-w-3xl rounded-lg bg-white p-4 shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input type="text" placeholder="Where are you going?" className="pl-10" />
            </div>
            <div className="flex flex-1 gap-4">
              <Input type="date" placeholder="Check-in" className="flex-1" />
              <Input type="date" placeholder="Check-out" className="flex-1" />
            </div>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
