"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface Amenity {
  id: number
  name: string
  icon: string
  category: string
}

interface HomestayFiltersProps {
  amenities: Amenity[]
  locations: string[]
  minPrice: number
  maxPrice: number
}

export function HomestayFilters({ amenities, locations, minPrice, maxPrice }: HomestayFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice])
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])

  // Initialize filters from URL params
  useEffect(() => {
    const minPriceParam = searchParams.get("minPrice")
    const maxPriceParam = searchParams.get("maxPrice")
    const amenitiesParam = searchParams.get("amenities")
    const locationsParam = searchParams.get("locations")

    if (minPriceParam && maxPriceParam) {
      setPriceRange([Number(minPriceParam), Number(maxPriceParam)])
    }

    if (amenitiesParam) {
      setSelectedAmenities(amenitiesParam.split(",").map(Number))
    }

    if (locationsParam) {
      setSelectedLocations(locationsParam.split(","))
    }
  }, [searchParams])

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    // Update price range
    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    // Update amenities
    if (selectedAmenities.length > 0) {
      params.set("amenities", selectedAmenities.join(","))
    } else {
      params.delete("amenities")
    }

    // Update locations
    if (selectedLocations.length > 0) {
      params.set("locations", selectedLocations.join(","))
    } else {
      params.delete("locations")
    }

    router.push(`/homestays?${params.toString()}`)
  }

  const handleClearFilters = () => {
    setPriceRange([minPrice, maxPrice])
    setSelectedAmenities([])
    setSelectedLocations([])
    router.push("/homestays")
  }

  const handleAmenityChange = (amenityId: number, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenityId])
    } else {
      setSelectedAmenities(selectedAmenities.filter((id) => id !== amenityId))
    }
  }

  const handleLocationChange = (location: string, checked: boolean) => {
    if (checked) {
      setSelectedLocations([...selectedLocations, location])
    } else {
      setSelectedLocations(selectedLocations.filter((loc) => loc !== location))
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Filters</h3>
        <Button variant="outline" size="sm" className="mb-4" onClick={handleClearFilters}>
          Clear All
        </Button>
      </div>

      <div>
        <h4 className="mb-3 font-medium">Price Range</h4>
        <div className="space-y-4">
          <Slider min={minPrice} max={maxPrice} step={10} value={priceRange} onValueChange={setPriceRange} />
          <div className="flex items-center justify-between">
            <span className="text-sm">${priceRange[0]}</span>
            <span className="text-sm">${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="mb-3 font-medium">Location</h4>
        <div className="space-y-2">
          {locations.map((location) => (
            <div key={location} className="flex items-center space-x-2">
              <Checkbox
                id={`location-${location}`}
                checked={selectedLocations.includes(location)}
                onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
              />
              <Label htmlFor={`location-${location}`} className="text-sm">
                {location}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="mb-3 font-medium">Amenities</h4>
        <div className="space-y-2">
          {amenities.map((amenity) => (
            <div key={amenity.id} className="flex items-center space-x-2">
              <Checkbox
                id={`amenity-${amenity.id}`}
                checked={selectedAmenities.includes(amenity.id)}
                onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
              />
              <Label htmlFor={`amenity-${amenity.id}`} className="text-sm">
                {amenity.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={handleApplyFilters}>
        Apply Filters
      </Button>
    </div>
  )
}
