"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Edit, Trash2, Search, Eye } from "lucide-react"

export function AdminHomestayTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  // This would be fetched from the API in a real application
  const homestays = [
    { id: 1, name: "Mountain View Retreat", location: "Sapa", price: 65, createdAt: "2023-01-15" },
    { id: 2, name: "Beachfront Paradise", location: "Da Nang", price: 85, createdAt: "2023-02-20" },
    { id: 3, name: "Traditional Village Home", location: "Hoi An", price: 55, createdAt: "2023-03-10" },
    { id: 4, name: "Riverside Bungalow", location: "Mekong Delta", price: 70, createdAt: "2023-04-05" },
    { id: 5, name: "City Center Apartment", location: "Ho Chi Minh City", price: 90, createdAt: "2023-05-12" },
  ]

  const filteredHomestays = homestays.filter(
    (homestay) =>
      homestay.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      homestay.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: number) => {
    // This would be a real API call in production
    // await fetch(`/api/homestays/${id}`, {
    //   method: "DELETE",
    //   headers: {
    //     "Authorization": `Bearer ${localStorage.getItem("token")}`
    //   }
    // })

    toast({
      title: "Homestay deleted",
      description: `Homestay ID ${id} has been deleted.`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search homestays..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">Add New Homestay</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHomestays.map((homestay) => (
              <TableRow key={homestay.id}>
                <TableCell>{homestay.id}</TableCell>
                <TableCell>{homestay.name}</TableCell>
                <TableCell>{homestay.location}</TableCell>
                <TableCell>${homestay.price}</TableCell>
                <TableCell>{homestay.createdAt}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(homestay.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
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
