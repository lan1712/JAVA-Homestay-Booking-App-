"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface HomestayGalleryProps {
  images: {
    id: number
    url: string
    isPrimary: boolean
  }[]
  mainImageUrl: string
}

export default function HomestayGallery({ images, mainImageUrl }: HomestayGalleryProps) {
  const [showGallery, setShowGallery] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const allImages = [{ id: 0, url: mainImageUrl, isPrimary: true }, ...images.filter((img) => img.url !== mainImageUrl)]

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <div>
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1 lg:col-span-2">
          <div
            className="relative h-[400px] w-full cursor-pointer overflow-hidden rounded-lg"
            onClick={() => {
              setCurrentImageIndex(0)
              setShowGallery(true)
            }}
          >
            <Image
              src={mainImageUrl || "/placeholder.svg"}
              alt="Main homestay image"
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {allImages.slice(1, 5).map((image, i) => (
            <div
              key={image.id}
              className="relative h-[190px] w-full cursor-pointer overflow-hidden rounded-lg"
              onClick={() => {
                setCurrentImageIndex(i + 1)
                setShowGallery(true)
              }}
            >
              <Image
                src={image.url || "/placeholder.svg"}
                alt={`Homestay image ${i + 1}`}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      <Dialog open={showGallery} onOpenChange={setShowGallery}>
        <DialogContent className="max-w-4xl bg-black p-0 text-white">
          <div className="relative h-[80vh]">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 z-10 text-white"
              onClick={() => setShowGallery(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="flex h-full items-center justify-center">
              <Button variant="ghost" size="icon" className="absolute left-2 z-10 text-white" onClick={handlePrevImage}>
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <div className="relative h-full w-full">
                <Image
                  src={allImages[currentImageIndex].url || "/placeholder.svg"}
                  alt={`Gallery image ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 z-10 text-white"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  className={`h-2 w-2 rounded-full ${i === currentImageIndex ? "bg-white" : "bg-gray-500"}`}
                  onClick={() => setCurrentImageIndex(i)}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
