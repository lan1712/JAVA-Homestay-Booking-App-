"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Search, MoreHorizontal, Eye, Edit, Trash2, Star } from "lucide-react"
import { format } from "date-fns"

// Mock data for reviews
const mockReviews = [
  {
    id: 1,
    homestayName: "Mountain View Retreat",
    userName: "John Doe",
    userEmail: "john@example.com",
    rating: 5,
    comment:
      "Amazing experience! The host family was incredibly welcoming and taught us so much about local culture. The views were breathtaking and the food was amazing.",
    createdAt: "2023-05-15T14:30:00Z",
  },
  {
    id: 2,
    homestayName: "Beachfront Paradise",
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    rating: 4,
    comment:
      "Beautiful location and very comfortable accommodations. The host was helpful and friendly. Only giving 4 stars because the Wi-Fi was a bit spotty.",
    createdAt: "2023-06-20T09:45:00Z",
  },
  {
    id: 3,
    homestayName: "Traditional Village Home",
    userName: "Robert Johnson",
    userEmail: "robert@example.com",
    rating: 5,
    comment:
      "This was my first homestay experience and it exceeded all expectations. The authentic local experience was something you can't get at a hotel. I'll definitely be booking through Good Place Travel again!",
    createdAt: "2023-07-05T16:20:00Z",
  },
  {
    id: 4,
    homestayName: "Riverside Bungalow",
    userName: "Emily Davis",
    userEmail: "emily@example.com",
    rating: 3,
    comment:
      "The location was beautiful but the room was smaller than expected. The host was nice but there was a language barrier that made communication difficult at times.",
    createdAt: "2023-08-12T11:10:00Z",
  },
  {
    id: 5,
    homestayName: "City Center Apartment",
    userName: "Michael Wilson",
    userEmail: "michael@example.com",
    rating: 5,
    comment:
      "Perfect location for exploring the city! The apartment was clean, modern, and had everything we needed. The host gave us great recommendations for local restaurants and attractions.",
    createdAt: "2023-09-08T08:15:00Z",
  },
]

export default function AdminReviewsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [reviews, setReviews] = useState(mockReviews)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [reviewToDelete, setReviewToDelete] = useState<number | null>(null)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [viewReview, setViewReview] = useState<(typeof mockReviews)[0] | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  useEffect(() => {
    // In a real app, this would fetch data from the API
    // For now, we'll use the mock data
    const fetchReviews = async () => {
      try {
        // const response = await fetch('/api/admin/reviews')
        // const data = await response.json()
        // setReviews(data)
      } catch (error) {
        console.error("Error fetching reviews:", error)
        toast({
          title: "Error",
          description: "Failed to load reviews",
          variant: "destructive",
        })
      }
    }

    fetchReviews()
  }, [toast])

  const filteredReviews = reviews.filter(
    (review) =>
      (review.homestayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedRating === null || review.rating === selectedRating),
  )

  const handleDeleteReview = async (id: number) => {
    try {
      // In a real app, this would call the API
      // await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' })

      // Update local state
      setReviews(reviews.filter((review) => review.id !== id))
      setReviewToDelete(null)
      setIsDeleteDialogOpen(false)

      toast({
        title: "Review deleted",
        description: "The review has been deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting review:", error)
      toast({
        title: "Error",
        description: "Failed to delete review",
        variant: "destructive",
      })
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Reviews</h1>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant={selectedRating === null ? "secondary" : "outline"} onClick={() => setSelectedRating(null)}>
            All
          </Button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <Button
              key={rating}
              variant={selectedRating === rating ? "secondary" : "outline"}
              onClick={() => setSelectedRating(rating)}
              className="flex items-center gap-1"
            >
              {rating} <Star className="h-3 w-3 fill-current" />
            </Button>
          ))}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Homestay</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>#{review.id}</TableCell>
                <TableCell className="font-medium">{review.homestayName}</TableCell>
                <TableCell>
                  <div>{review.userName}</div>
                  <div className="text-xs text-muted-foreground">{review.userEmail}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate">{review.comment}</TableCell>
                <TableCell>{format(new Date(review.createdAt), "MMM d, yyyy")}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setViewReview(review)
                          setIsViewDialogOpen(true)
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Full Review
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Review
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setReviewToDelete(review.id)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Review
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredReviews.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No reviews found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this review?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the review from the system.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => reviewToDelete && handleDeleteReview(reviewToDelete)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
          </DialogHeader>
          {viewReview && (
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">{viewReview.homestayName}</h3>
                  <p className="text-sm text-muted-foreground">
                    By {viewReview.userName} on {format(new Date(viewReview.createdAt), "MMMM d, yyyy")}
                  </p>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < viewReview.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="rounded-md bg-gray-50 p-4">
                <p>{viewReview.comment}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
