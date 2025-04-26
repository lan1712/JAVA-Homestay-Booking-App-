"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useToast } from "@/components/ui/use-toast"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Star, ImageIcon, Tag } from "lucide-react"
import { homestayService } from "@/services/api"

interface Homestay {
  id: number
  name: string
  location: string
  price: number
  rating: number
  reviewCount: number
  isFeatured: boolean
  imageCount: number
  amenityCount: number
  createdAt: string
}

interface PaginatedResponse {
  content: Homestay[]
  totalPages: number
  totalElements: number
  size: number
  number: number
}

export default function AdminHomestaysPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // Get pagination params from URL
  const page = Number(searchParams.get("page") || "0")
  const size = Number(searchParams.get("size") || "10")
  const searchTerm = searchParams.get("search") || ""

  const [homestays, setHomestays] = useState<Homestay[]>([])
  const [pagination, setPagination] = useState({
    totalPages: 0,
    totalElements: 0,
    size: size,
    number: page,
  })
  const [selectedHomestays, setSelectedHomestays] = useState<number[]>([])
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [homestayToDelete, setHomestayToDelete] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHomestays = async () => {
      setIsLoading(true)
      try {
        const params = {
          page,
          size,
          search: searchTerm,
        }

        const response: PaginatedResponse = await homestayService.getAll(params)

        setHomestays(response.content)
        setPagination({
          totalPages: response.totalPages,
          totalElements: response.totalElements,
          size: response.size,
          number: response.number,
        })
      } catch (error) {
        console.error("Error fetching homestays:", error)
        toast({
          title: "Error",
          description: "Failed to load homestays. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchHomestays()
  }, [page, size, searchTerm, toast])

  const handleSearch = (term: string) => {
    // Update URL with search term and reset to first page
    const params = new URLSearchParams(searchParams.toString())
    if (term) {
      params.set("search", term)
    } else {
      params.delete("search")
    }
    params.set("page", "0")
    router.push(`/admin/homestays?${params.toString()}`)
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())
    router.push(`/admin/homestays?${params.toString()}`)
  }

  const handleSizeChange = (newSize: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("size", newSize.toString())
    params.set("page", "0") // Reset to first page when changing size
    router.push(`/admin/homestays?${params.toString()}`)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedHomestays(homestays.map((homestay) => homestay.id))
    } else {
      setSelectedHomestays([])
    }
  }

  const handleSelectHomestay = (homestayId: number, checked: boolean) => {
    if (checked) {
      setSelectedHomestays([...selectedHomestays, homestayId])
    } else {
      setSelectedHomestays(selectedHomestays.filter((id) => id !== homestayId))
    }
  }

  const handleDeleteHomestay = async (id: number) => {
    try {
      await homestayService.delete(id)

      // Update local state
      setHomestays(homestays.filter((homestay) => homestay.id !== id))
      setHomestayToDelete(null)
      setIsDeleteDialogOpen(false)

      // If we deleted the last item on the page, go to previous page
      if (homestays.length === 1 && pagination.number > 0) {
        handlePageChange(pagination.number - 1)
      } else {
        // Refresh the current page
        const params = {
          page: pagination.number,
          size: pagination.size,
          search: searchTerm,
        }
        const response: PaginatedResponse = await homestayService.getAll(params)
        setHomestays(response.content)
        setPagination({
          totalPages: response.totalPages,
          totalElements: response.totalElements,
          size: response.size,
          number: response.number,
        })
      }

      toast({
        title: "Homestay deleted",
        description: "The homestay has been deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting homestay:", error)
      toast({
        title: "Error",
        description: "Failed to delete homestay. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedHomestays.map((id) => homestayService.delete(id)))

      toast({
        title: "Homestays deleted",
        description: `${selectedHomestays.length} homestays have been deleted successfully.`,
      })

      // Refresh the current page
      const params = {
        page: pagination.number,
        size: pagination.size,
        search: searchTerm,
      }
      const response: PaginatedResponse = await homestayService.getAll(params)
      setHomestays(response.content)
      setPagination({
        totalPages: response.totalPages,
        totalElements: response.totalElements,
        size: response.size,
        number: response.number,
      })

      setSelectedHomestays([])
    } catch (error) {
      console.error("Error deleting homestays:", error)
      toast({
        title: "Error",
        description: "Failed to delete homestays. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleToggleFeatured = async (id: number, isFeatured: boolean) => {
    try {
      await homestayService.toggleFeatured(id)

      // Update local state
      setHomestays(
        homestays.map((homestay) => (homestay.id === id ? { ...homestay, isFeatured: !isFeatured } : homestay)),
      )

      toast({
        title: isFeatured ? "Removed from featured" : "Added to featured",
        description: `The homestay has been ${isFeatured ? "removed from" : "added to"} featured homestays.`,
      })
    } catch (error) {
      console.error("Error toggling featured status:", error)
      toast({
        title: "Error",
        description: "Failed to update featured status. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p>Loading homestays...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Homestays</h1>
        <Button onClick={() => router.push("/admin/homestays/new")} className="bg-teal-600 hover:bg-teal-700">
          <Plus className="mr-2 h-4 w-4" />
          Add New Homestay
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search homestays..."
            className="pl-8"
            defaultValue={searchTerm}
            onChange={(e) => {
              if (e.target.value === "") {
                handleSearch("")
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(e.currentTarget.value)
              }
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          {selectedHomestays.length > 0 && (
            <Button variant="outline" onClick={() => setSelectedHomestays([])}>
              Clear Selection ({selectedHomestays.length})
            </Button>
          )}
          {selectedHomestays.length > 0 && (
            <Button variant="destructive" onClick={handleDeleteSelected}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Selected
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={homestays.length > 0 && selectedHomestays.length === homestays.length}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {homestays.map((homestay) => (
              <TableRow key={homestay.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedHomestays.includes(homestay.id)}
                    onCheckedChange={(checked) => handleSelectHomestay(homestay.id, checked as boolean)}
                    aria-label={`Select homestay ${homestay.name}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{homestay.name}</TableCell>
                <TableCell>{homestay.location}</TableCell>
                <TableCell>${homestay.price}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4 text-amber-500" />
                    <span>{homestay.rating}</span>
                    <span className="ml-1 text-xs text-muted-foreground">({homestay.reviewCount})</span>
                  </div>
                </TableCell>
                <TableCell>
                  {homestay.isFeatured && <Badge className="bg-amber-100 text-amber-800">Featured</Badge>}
                </TableCell>
                <TableCell>{homestay.createdAt}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => router.push(`/admin/homestays/${homestay.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push(`/admin/homestays/${homestay.id}/images`)}>
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Manage Images ({homestay.imageCount})
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push(`/admin/homestays/${homestay.id}/amenities`)}>
                        <Tag className="mr-2 h-4 w-4" />
                        Manage Amenities ({homestay.amenityCount})
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleFeatured(homestay.id, homestay.isFeatured)}>
                        <Star className="mr-2 h-4 w-4" />
                        {homestay.isFeatured ? "Remove from Featured" : "Add to Featured"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setHomestayToDelete(homestay.id)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {homestays.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No homestays found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {homestays.length} of {pagination.totalElements} homestays
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm">Items per page:</span>
          <select
            className="rounded-md border border-input bg-background px-2 py-1 text-sm"
            value={pagination.size}
            onChange={(e) => handleSizeChange(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => pagination.number > 0 && handlePageChange(pagination.number - 1)}
                className={pagination.number === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            {Array.from({ length: pagination.totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink isActive={pagination.number === i} onClick={() => handlePageChange(i)}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => pagination.number < pagination.totalPages - 1 && handlePageChange(pagination.number + 1)}
                className={
                  pagination.number === pagination.totalPages - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this homestay?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the homestay and all associated data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => homestayToDelete && handleDeleteHomestay(homestayToDelete)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
