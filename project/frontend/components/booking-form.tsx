"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface BookingFormProps {
  homestayId: string
  price: number
}

export default function BookingForm({ homestayId, price }: BookingFormProps) {
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const calculateTotal = () => {
    const nights = calculateNights()
    return nights * price
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!checkIn || !checkOut) {
      toast({
        title: "Missing dates",
        description: "Please select check-in and check-out dates",
        variant: "destructive",
      })
      return
    }

    // Check if user is logged in
    const token = localStorage.getItem("token")
    if (!token) {
      toast({
        title: "Login required",
        description: "Please login to book a homestay",
      })
      router.push("/auth/login")
      return
    }

    setIsLoading(true)

    try {
      // This would be a real API call in production
      // const response = await fetch("/api/bookings", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization": `Bearer ${token}`
      //   },
      //   body: JSON.stringify({
      //     homest  `Bearer ${token}`
      //   },
      //   body: JSON.stringify({
      //     homestayId,
      //     checkInDate: checkIn.toISOString(),
      //     checkOutDate: checkOut.toISOString(),
      //     numberOfGuests: guests
      //   })
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Booking successful",
        description: "Your booking has been confirmed!",
      })

      router.push("/profile")
    } catch (error) {
      toast({
        title: "Booking failed",
        description: "There was a problem with your booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-lg border p-4">
        <div className="text-lg font-bold">
          ${price} <span className="text-sm font-normal text-muted-foreground">/ night</span>
        </div>

        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Check-in</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !checkIn && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn ? format(checkIn, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    initialFocus
                    disabled={(date) => date < new Date() || (checkOut ? date >= checkOut : false)}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Check-out</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !checkOut && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut ? format(checkOut, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    initialFocus
                    disabled={(date) => date <= new Date() || (checkIn ? date <= checkIn : false)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Guests</label>
            <select
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={guests}
              onChange={(e) => setGuests(Number.parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {checkIn && checkOut && (
        <div className="space-y-2 rounded-lg border p-4">
          <div className="flex justify-between">
            <span>
              ${price} x {calculateNights()} nights
            </span>
            <span>${price * calculateNights()}</span>
          </div>
          <div className="flex justify-between">
            <span>Service fee</span>
            <span>${Math.round(price * calculateNights() * 0.1)}</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${calculateTotal() + Math.round(price * calculateNights() * 0.1)}</span>
            </div>
          </div>
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-teal-600 hover:bg-teal-700"
        disabled={isLoading || !checkIn || !checkOut}
      >
        {isLoading ? "Processing..." : "Book Now"}
      </Button>
    </form>
  )
}
