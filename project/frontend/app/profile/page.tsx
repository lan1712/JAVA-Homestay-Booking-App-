"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookingCard } from "@/components/booking-card"
import { ProfileForm } from "@/components/profile-form"
import { useToast } from "@/components/ui/use-toast"

interface User {
  name?: string
  email: string
  role: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/auth/login")
      return
    }

    try {
      setUser(JSON.parse(userData))
    } catch (error) {
      console.error("Failed to parse user data", error)
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      router.push("/auth/login")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">My Profile</h1>

      <Tabs defaultValue="bookings">
        <TabsList className="mb-8">
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="profile">Profile Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Your Bookings</h2>

            {/* This would be fetched from the API in a real application */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <BookingCard
                  key={i}
                  id={i + 1}
                  homestayName={`Mountain Retreat ${i + 1}`}
                  location={["Sapa", "Da Nang", "Hoi An"][i % 3]}
                  checkIn={new Date(2023, 5 + i, 15).toISOString()}
                  checkOut={new Date(2023, 5 + i, 20).toISOString()}
                  status={["CONFIRMED", "PENDING", "COMPLETED"][i % 3]}
                  imageUrl={`/placeholder.svg?height=200&width=300&text=Booking+${i + 1}`}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="profile">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account information</CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileForm user={user} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Email Notifications</h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="booking-updates"
                      className="h-4 w-4 rounded border-gray-300"
                      defaultChecked
                    />
                    <label htmlFor="booking-updates">Booking updates</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="promotions" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                    <label htmlFor="promotions">Promotions and deals</label>
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
