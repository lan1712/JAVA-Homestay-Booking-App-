"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ChevronDown, ChevronUp } from "lucide-react"
import { format } from "date-fns"

interface ReviewListProps {
  reviews: {
    id: number
    userName: string
    rating: number
    comment: string
    createdAt: string
  }[]
}

export default function ReviewList({ reviews }: ReviewListProps) {
  const [showAll, setShowAll] = useState(false)

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Guest Reviews</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length)
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="font-medium">
            {reviews.length > 0
              ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
              : "No reviews yet"}
          </span>
          <span className="text-muted-foreground">({reviews.length} reviews)</span>
        </div>
      </div>

      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="font-medium">{review.userName}</div>
                <div className="text-sm text-muted-foreground">
                  {format(new Date(review.createdAt), "MMMM d, yyyy")}
                </div>
              </div>
              <div className="mb-2 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${star <= review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {reviews.length > 3 && (
        <Button variant="outline" className="w-full" onClick={() => setShowAll(!showAll)}>
          {showAll ? (
            <>
              Show Less <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Show All Reviews <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      )}
    </div>
  )
}
