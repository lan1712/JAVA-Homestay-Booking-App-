import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"
import { format } from "date-fns"

interface BookingCardProps {
  id: number
  homestayName: string
  location: string
  checkIn: string
  checkOut: string
  status: string
  imageUrl: string
}

export function BookingCard({ id, homestayName, location, checkIn, checkOut, status, imageUrl }: BookingCardProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy")
  }

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "CANCELLED":
        return "bg-red-100 text-red-800"
      case "COMPLETED":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 w-full">
        <img src={imageUrl || "/placeholder.svg"} alt={homestayName} className="h-full w-full object-cover" />
        <Badge className={`absolute right-2 top-2 ${getStatusColor(status)}`}>{status}</Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{homestayName}</h3>
        <div className="mt-1 flex items-center gap-1">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{location}</span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              <span className="font-medium">Check-in:</span> {formatDate(checkIn)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              <span className="font-medium">Check-out:</span> {formatDate(checkOut)}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="flex w-full gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            View Details
          </Button>
          {status.toUpperCase() === "PENDING" && (
            <Button variant="destructive" size="sm" className="flex-1">
              Cancel
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
