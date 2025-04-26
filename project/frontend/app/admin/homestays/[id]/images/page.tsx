"use client"

import { Input } from "@/components/ui/input"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Upload, Trash2, Star } from "lucide-react"
import { homestayService } from "@/services/api"

interface HomestayImage {
  id: number
  url: string
  isPrimary: boolean
}

export default function HomestayImagesPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [homestay, setHomestay] = useState<{ id: number; name: string }>({ id: 0, name: "" })
  const [images, setImages] = useState<HomestayImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  useEffect(() => {
    const fetchHomestayAndImages = async () => {
      try {
        const [homestayData, imagesData] = await Promise.all([
          homestayService.getById(Number(params.id)),
          homestayService.getImages(Number(params.id)),
        ])

        setHomestay({ id: homestayData.id, name: homestayData.name })
        setImages(imagesData)
      } catch (error) {
        console.error("Error fetching homestay images:", error)
        toast({
          title: "Error",
          description: "Failed to load homestay images. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchHomestayAndImages()
  }, [params.id, toast])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedFiles(files)

    // Create preview URLs for selected files
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file))
    setPreviewUrls(newPreviewUrls)
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      selectedFiles.forEach((file) => {
        formData.append("images", file)
      })

      // Set the first image as primary if there are no images yet
      if (images.length === 0) {
        formData.append("isPrimary", "true")
      }

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + 10
          return newProgress >= 90 ? 90 : newProgress
        })
      }, 300)

      const result = await homestayService.uploadImages(homestay.id, formData)

      clearInterval(progressInterval)
      setUploadProgress(100)

      // Clean up preview URLs
      previewUrls.forEach((url) => URL.revokeObjectURL(url))

      // Reset form and refresh images
      setSelectedFiles([])
      setPreviewUrls([])
      if (fileInputRef.current) fileInputRef.current.value = ""

      // Fetch updated images
      const updatedImages = await homestayService.getImages(homestay.id)
      setImages(updatedImages)

      toast({
        title: "Images uploaded",
        description: `Successfully uploaded ${selectedFiles.length} image(s).`,
      })
    } catch (error) {
      console.error("Error uploading images:", error)
      toast({
        title: "Upload failed",
        description: "Failed to upload images. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleDeleteImage = async (imageId: number) => {
    try {
      await homestayService.deleteImage(imageId)

      // Update local state
      setImages(images.filter((img) => img.id !== imageId))

      toast({
        title: "Image deleted",
        description: "The image has been deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting image:", error)
      toast({
        title: "Error",
        description: "Failed to delete image. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSetPrimary = async (imageId: number) => {
    try {
      await homestayService.setPrimaryImage(homestay.id, imageId)

      // Update local state
      setImages(
        images.map((img) => ({
          ...img,
          isPrimary: img.id === imageId,
        })),
      )

      toast({
        title: "Primary image updated",
        description: "The primary image has been updated successfully.",
      })
    } catch (error) {
      console.error("Error setting primary image:", error)
      toast({
        title: "Error",
        description: "Failed to set primary image. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p>Loading homestay images...</p>
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
          <h1 className="text-3xl font-bold">Manage Images</h1>
        </div>
        <div className="text-sm text-muted-foreground">
          Homestay: <span className="font-medium">{homestay.name}</span>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="images">Select Images</Label>
              <Input
                ref={fileInputRef}
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </div>

            {previewUrls.length > 0 && (
              <div>
                <Label>Selected Images Preview</Label>
                <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative h-32 w-full overflow-hidden rounded-md border">
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isUploading && (
              <div className="space-y-2">
                <div className="text-sm">Uploading... {uploadProgress}%</div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full bg-teal-600 transition-all" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              </div>
            )}

            <Button
              onClick={handleUpload}
              className="bg-teal-600 hover:bg-teal-700"
              disabled={selectedFiles.length === 0 || isUploading}
            >
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? "Uploading..." : "Upload Images"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Image Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          {images.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              No images uploaded yet. Upload images using the form above.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {images.map((image) => (
                <div key={image.id} className="relative overflow-hidden rounded-md border">
                  <div className="relative h-48 w-full">
                    <img src={image.url || "/placeholder.svg"} alt="Homestay" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={image.isPrimary}
                        onCheckedChange={() => !image.isPrimary && handleSetPrimary(image.id)}
                        disabled={image.isPrimary}
                      />
                      <Label className="text-sm">Primary</Label>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-50 hover:text-red-600"
                      onClick={() => handleDeleteImage(image.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {image.isPrimary && (
                    <div className="absolute left-2 top-2 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                      <Star className="mr-1 inline-block h-3 w-3" />
                      Primary
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
