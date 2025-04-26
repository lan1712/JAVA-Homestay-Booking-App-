"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Search, Eye, CheckCircle, XCircle } from "lucide-react"

export function AdminBookingTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  // This would be fetched from the API in a real application
  const bookings = [
    {
      id: 1,
      homestayName: "Mountain View Retreat",
      userName: "John Doe",
      checkIn: "2023-06-15",
      checkOut: "2023-06-20",
      status: "PENDING",
      totalPrice: 325,
    },
    {
      id: 2,
      homestayName: "Beachfront Paradise",
      userName: "Jane Smith",
      checkIn: "2023-07-10",
      checkOut: "2023-07-15",
      status: "CONFIRMED",
      totalPrice: 425,
    },
    {
      id: 3,
      homestayName: "Traditional Village Home",
      userName: "Bob Johnson",
      checkIn: "2023-08-05",
      checkOut: "2023-08-10",
      status: "COMPLETED",
      totalPrice: 275,
    },
    {
      id: 4,
      homestayName: "Riverside Bungalow",
      userName: "Alice Brown",
      checkIn: "2023-09-20",
      checkOut: "2023-09-25",
      status: "CANCELLED",
      totalPrice: 350,
    },
    {
      id: 5,
      homestayName: "City Center Apartment",
      userName: "Mike Wilson",
      checkIn: "2023-10-15",
      checkOut: "2023-10-20",
      status: "CONFIRMED",
      totalPrice: 450,
    },
  ]

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.homestayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
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

  const handleConfirm = (id: number) => {
    // This would be a real API call in production
    // await fetch(`/api/bookings/${id}/confirm`, {
    //   method: "PUT",
    //   headers: {
    //     "Authorization": `Bearer ${localStorage.getItem("token")}`
    //   }
    // })

    toast({
      title: "Booking confirmed",
      description: `Booking ID ${id} has been confirmed.`,
    })
  }

  const handleCancel = (id: number) => {
    // This would be a real API call in production
    // await fetch(`/api/bookings/${id}/cancel`, {
    //   method: "PUT",
    //   headers: {
    //     "Authorization": `Bearer ${localStorage.getItem("token")}`
    //   }
    // })

    toast({
      title: "Booking cancelled",
      description: `Booking ID ${id} has been cancelled.`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Homestay</TableHead>
              <TableHead>Guest</TableHead>
              <TableHead>Check-in</TableHead>
              <TableHead>Check-out</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.id}</TableCell>
                <TableCell>{booking.homestayName}</TableCell>
                <TableCell>{booking.userName}</TableCell>
                <TableCell>{booking.checkIn}</TableCell>
                <TableCell>{booking.checkOut}</TableCell>
                <TableCell>
                  <span className={`rounded-full px-2 py-1 text-xs ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </TableCell>
                <TableCell>${booking.totalPrice}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {booking.status === "PENDING" && (
                      <>
                        <Button variant="ghost" size="icon" onClick={() => handleConfirm(booking.id)}>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleCancel(booking.id)}>
                          <XCircle className="h-4 w-4 text-red-500" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
