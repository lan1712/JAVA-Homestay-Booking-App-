"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

export default function AdminSettingsPage() {
  const { toast } = useToast()

  // Site settings
  const [siteName, setSiteName] = useState("Good Place Travel")
  const [siteDescription, setSiteDescription] = useState("Discover authentic homestay experiences in Vietnam")
  const [contactEmail, setContactEmail] = useState("contact@goodplacetravel.com")
  const [contactPhone, setContactPhone] = useState("+84 123 456 789")

  // Email settings
  const [smtpHost, setSmtpHost] = useState("smtp.example.com")
  const [smtpPort, setSmtpPort] = useState("587")
  const [smtpUsername, setSmtpUsername] = useState("notifications@goodplacetravel.com")
  const [smtpPassword, setSmtpPassword] = useState("••••••••••••")

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [bookingNotifications, setBookingNotifications] = useState(true)
  const [reviewNotifications, setReviewNotifications] = useState(true)
  const [userRegistrationNotifications, setUserRegistrationNotifications] = useState(true)

  const handleSaveSiteSettings = () => {
    // In a real app, this would call the API
    // await fetch('/api/admin/settings/site', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     siteName,
    //     siteDescription,
    //     contactEmail,
    //     contactPhone
    //   })
    // })

    toast({
      title: "Settings saved",
      description: "Your site settings have been saved successfully.",
    })
  }

  const handleSaveEmailSettings = () => {
    // In a real app, this would call the API
    // await fetch('/api/admin/settings/email', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     smtpHost,
    //     smtpPort,
    //     smtpUsername,
    //     smtpPassword: smtpPassword === '••••••••••••' ? null : smtpPassword
    //   })
    // })

    toast({
      title: "Settings saved",
      description: "Your email settings have been saved successfully.",
    })
  }

  const handleSaveNotificationSettings = () => {
    // In a real app, this would call the API
    // await fetch('/api/admin/settings/notifications', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     emailNotifications,
    //     bookingNotifications,
    //     reviewNotifications,
    //     userRegistrationNotifications
    //   })
    // })

    toast({
      title: "Settings saved",
      description: "Your notification settings have been saved successfully.",
    })
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Settings</h1>

      <Tabs defaultValue="site" className="space-y-6">
        <TabsList>
          <TabsTrigger value="site">Site Settings</TabsTrigger>
          <TabsTrigger value="email">Email Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="site">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
              <CardDescription>Manage your site's basic information and contact details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea
                  id="site-description"
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Contact Phone</Label>
                <Input id="contact-phone" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSiteSettings} className="bg-teal-600 hover:bg-teal-700">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>Configure your email server settings for sending notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-host">SMTP Host</Label>
                <Input id="smtp-host" value={smtpHost} onChange={(e) => setSmtpHost(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-port">SMTP Port</Label>
                <Input id="smtp-port" value={smtpPort} onChange={(e) => setSmtpPort(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-username">SMTP Username</Label>
                <Input id="smtp-username" value={smtpUsername} onChange={(e) => setSmtpUsername(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-password">SMTP Password</Label>
                <Input
                  id="smtp-password"
                  type="password"
                  value={smtpPassword}
                  onChange={(e) => setSmtpPassword(e.target.value)}
                />
              </div>
              <div className="pt-4">
                <Button variant="outline">Test Email Connection</Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveEmailSettings} className="bg-teal-600 hover:bg-teal-700">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure which events trigger notifications and how they are delivered.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Enable or disable all email notifications</p>
                </div>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="booking-notifications">Booking Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications when new bookings are made</p>
                </div>
                <Switch
                  id="booking-notifications"
                  checked={bookingNotifications}
                  onCheckedChange={setBookingNotifications}
                  disabled={!emailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="review-notifications">Review Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications when new reviews are submitted</p>
                </div>
                <Switch
                  id="review-notifications"
                  checked={reviewNotifications}
                  onCheckedChange={setReviewNotifications}
                  disabled={!emailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="user-registration-notifications">User Registration Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications when new users register</p>
                </div>
                <Switch
                  id="user-registration-notifications"
                  checked={userRegistrationNotifications}
                  onCheckedChange={setUserRegistrationNotifications}
                  disabled={!emailNotifications}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotificationSettings} className="bg-teal-600 hover:bg-teal-700">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
