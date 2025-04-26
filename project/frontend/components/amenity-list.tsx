import {
  Wifi,
  AirVent,
  Droplets,
  Tv,
  UtensilsCrossed,
  Waves,
  Bath,
  Mountain,
  Ship,
  Flower2,
  Building2,
  Coffee,
  Plane,
  Bike,
  Map,
} from "lucide-react"

interface AmenityListProps {
  amenities: {
    id: number
    name: string
    icon: string
    category: string
  }[]
  compact?: boolean
}

export default function AmenityList({ amenities, compact = false }: AmenityListProps) {
  // Map icon names to Lucide React icons
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "wifi":
        return <Wifi className="h-5 w-5 text-teal-600" />
      case "air-conditioning":
        return <AirVent className="h-5 w-5 text-teal-600" />
      case "hot-water":
        return <Droplets className="h-5 w-5 text-teal-600" />
      case "tv":
        return <Tv className="h-5 w-5 text-teal-600" />
      case "kitchen":
        return <UtensilsCrossed className="h-5 w-5 text-teal-600" />
      case "washing-machine":
        return <Waves className="h-5 w-5 text-teal-600" />
      case "bathroom":
        return <Bath className="h-5 w-5 text-teal-600" />
      case "mountain":
        return <Mountain className="h-5 w-5 text-teal-600" />
      case "ocean":
        return <Ship className="h-5 w-5 text-teal-600" />
      case "garden":
        return <Flower2 className="h-5 w-5 text-teal-600" />
      case "city":
        return <Building2 className="h-5 w-5 text-teal-600" />
      case "breakfast":
        return <Coffee className="h-5 w-5 text-teal-600" />
      case "airport":
        return <Plane className="h-5 w-5 text-teal-600" />
      case "bicycle":
        return <Bike className="h-5 w-5 text-teal-600" />
      case "guide":
        return <Map className="h-5 w-5 text-teal-600" />
      default:
        return <Wifi className="h-5 w-5 text-teal-600" />
    }
  }

  if (compact) {
    return (
      <div className="flex flex-wrap gap-2">
        {amenities.slice(0, 5).map((amenity) => (
          <div
            key={amenity.id}
            className="flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1 text-sm text-teal-700"
          >
            {getIcon(amenity.icon)}
            <span>{amenity.name}</span>
          </div>
        ))}
        {amenities.length > 5 && (
          <div className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">+{amenities.length - 5} more</div>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {amenities.map((amenity) => (
        <div key={amenity.id} className="flex items-center gap-2">
          {getIcon(amenity.icon)}
          <span>{amenity.name}</span>
        </div>
      ))}
    </div>
  )
}
