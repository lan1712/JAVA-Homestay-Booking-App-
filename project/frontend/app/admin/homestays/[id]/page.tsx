"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Save } from "lucide-react"
import { homestayService } from "@/services/api"

// Define the form validation schema with Zod
const homestayFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }).max(100),
  location: z.string().min(3, { message: "Location must be at least 3 characters" }).max(100),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number" })
    .min(1, { message: "Price must be at least 1" }),
  imageUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  isFeatured: z.boolean().default(false),
})

type HomestayFormValues = z.infer<typeof homestayFormSchema>

export default function AdminHomestayEditPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const isNewHomestay = params.id === "new"

  const [isLoading, setIsLoading] = useState(!isNewHomestay)
  const [isSaving, setIsSaving] = useState(false)

  // Initialize the form with React Hook Form and Zod validation
  const form = useForm<HomestayFormValues>({
    resolver: zodResolver(homestayFormSchema),
    defaultValues: {
      name: "",
      location: "",
      description: "",
      price: 0,
      imageUrl: "",
      isFeatured: false,
    },
  })

  useEffect(() => {
    if (!isNewHomestay) {
      const fetchHomestay = async () => {
        try {
          const data = await homestayService.getById(Number(params.id))

          // Set form values from API data
          form.reset({
            name: data.name,
            location: data.location,
            description: data.description,
            price: data.price,
            imageUrl: data.imageUrl || "",
            isFeatured: data.isFeatured,
          })
        } catch (error) {
          console.error("Error fetching homestay:", error)
          toast({
            title: "Error",
            description: "Failed to load homestay details. Please try again.",
            variant: "destructive",
          })
        } finally {
          setIsLoading(false)
        }
      }

      fetchHomestay()
    } else {
      setIsLoading(false)
    }
  }, [params.id, isNewHomestay, form, toast])

  const onSubmit = async (values: HomestayFormValues) => {
    setIsSaving(true)

    try {
      if (isNewHomestay) {
        await homestayService.create(values)
        toast({
          title: "Homestay created",
          description: "The homestay has been created successfully.",
        })
      } else {
        await homestayService.update(Number(params.id), values)
        toast({
          title: "Homestay updated",
          description: "The homestay has been updated successfully.",
        })
      }

      router.push("/admin/homestays")
    } catch (error) {
      console.error("Error saving homestay:", error)
      toast({
        title: "Error",
        description: isNewHomestay ? "Failed to create homestay" : "Failed to update homestay",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p>Loading homestay details...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.push("/admin/homestays")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">{isNewHomestay ? "Add New Homestay" : "Edit Homestay"}</h1>
        </div>
        <Button onClick={form.handleSubmit(onSubmit)} className="bg-teal-600 hover:bg-teal-700" disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save Homestay"}
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList>
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Homestay Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter homestay name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter location (e.g., City, Country)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description *</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter detailed description of the homestay" rows={5} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price per Night (USD) *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter price per night" min="0" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Main Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter URL for main image" {...field} />
                        </FormControl>
                        <FormMessage />
                        {field.value && (
                          <div className="mt-2 h-40 w-full overflow-hidden rounded-md border">
                            <img
                              src={field.value || "/placeholder.svg"}
                              alt="Homestay preview"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Homestay"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Additional Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    After saving the basic information, you can add more details about the homestay.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="images">
              <Card>
                <CardHeader>
                  <CardTitle>Image Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    After saving the basic information, you can manage the homestay's image gallery.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="amenities">
              <Card>
                <CardHeader>
                  <CardTitle>Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    After saving the basic information, you can manage the homestay's amenities.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  )
}
