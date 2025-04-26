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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"
import { Search, MoreHorizontal, Eye, CheckCircle, XCircle, Trash2, CalendarIcon, FilterX } from "lucide-react"
import { format } from "date-fns"
import { bookingService } from "@/services/api"

interface Booking {
  id: number
  homestayName: string
  userName: string
  userEmail: string
  checkIn: string
  checkOut: string
  status: string
  totalPrice: number
  createdAt: string
}

interface PaginatedResponse {
  content: Booking[]
  totalPages: number
  totalElements: number
  size: number
  number: number
}

export default function AdminBookingsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // Get params from URL
  const page = Number(searchParams.get("page") || "0")
  const size = Number(searchParams.get("size") || "10")
  const searchTerm = searchParams.get("search") || ""
  const status = searchParams.get("status") || ""
  const fromDate = searchParams.get("fromDate") || ""
  const toDate = searchParams.get("toDate") || ""
  const minPrice = searchParams.get("minPrice") || ""
  const maxPrice = searchParams.get("maxPrice") || ""

  const [bookings, setBookings] = useState<Booking[]>([])
  const [pagination, setPagination] = useState({
    totalPages: 0,
    totalElements: 0,
    size: size,
    number: page,
  })
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [bookingToDelete, setBookingToDelete] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Filter state
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: fromDate ? new Date(fromDate) : undefined,
    to: toDate ? new Date(toDate) : undefined,
  })
  const [priceRange, setPriceRange] = useState({
    min: minPrice,
    max: maxPrice,
  })
  const [showFilters, setShowFilters] = useState(false)
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  useEffect(() => {
    // Count active filters
    let count = 0
    if (status) count++
    if (fromDate) count++
    if (toDate) count++
    if (minPrice) count++
    if (maxPrice) count++
    setActiveFiltersCount(count)
  }, [status, fromDate, toDate, minPrice, maxPrice])

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true)
      try {
        const params = {
          page,
          size,
          search: searchTerm,
          status,
          fromDate,
          toDate,
          minPrice,
          maxPrice,
        }

        const response: PaginatedResponse = await bookingService.getAll(params)

        setBookings(response.content)
        setPagination({
          totalPages: response.totalPages,
          totalElements: response.totalElements,
          size: response.size,
          number: response.number,
        })
      } catch (error) {
        console.error("Error fetching bookings:", error)
        toast({
          title: "Error",
          description: "Failed to load bookings. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [page, size, searchTerm, status, fromDate, toDate, minPrice, maxPrice, toast])

  const handleSearch = (term: string) => {
    // Update URL with search term and reset to first page
    const params = new URLSearchParams(searchParams.toString())
    if (term) {
      params.set("search", term)
    } else {
      params.delete("search")
    }
    params.set("page", "0")
    router.push(`/admin/bookings?${params.toString()}`)
  }

  const handleStatusFilter = (newStatus: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (newStatus) {
      params.set("status", newStatus)
    } else {
      params.delete("status")
    }
    params.set("page", "0")
    router.push(`/admin/bookings?${params.toString()}`)
  }

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range)

    const params = new URLSearchParams(searchParams.toString())
    if (range.from) {
      params.set("fromDate", format(range.from, "yyyy-MM-dd"))
    } else {
      params.delete("fromDate")
    }

    if (range.to) {
      params.set("toDate", format(range.to, "yyyy-MM-dd"))
    } else {
      params.delete("toDate")
    }

    params.set("page", "0")
    router.push(`/admin/bookings?${params.toString()}`)
  }

  const handlePriceRangeChange = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (priceRange.min) {
      params.set("minPrice", priceRange.min)
    } else {
      params.delete("minPrice")
    }

    if (priceRange.max) {
      params.set("maxPrice", priceRange.max)
    } else {
      params.delete("maxPrice")
    }

    params.set("page", "0")
    router.push(`/admin/bookings?${params.toString()}`)
  }

  const handleClearFilters = () => {
    const params = new URLSearchParams()
    if (searchTerm) {
      params.set("search", searchTerm)
    }
    params.set("page", "0")
    params.set("size", size.toString())
    router.push(`/admin/bookings?${params.toString()}`)

    // Reset local state
    setDateRange({ from: undefined, to: undefined })
    setPriceRange({ min: "", max: "" })
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())
    router.push(`/admin/bookings?${params.toString()}`)
  }

  const handleSizeChange = (newSize: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("size", newSize.toString())
    params.set("page", "0") // Reset to first page when changing size
    router.push(`/admin/bookings?${params.toString()}`)
  }

  const handleDeleteBooking = async (id: number) => {
    try {
      await bookingService.delete(id)

      // Update local state
      setBookings(bookings.filter((booking) => booking.id !== id))
      setBookingToDelete(null)
      setIsDeleteDialogOpen(false)

      // If we deleted the last item on the page, go to previous page
      if (bookings.length === 1 && pagination.number > 0) {
        handlePageChange(pagination.number - 1)
      } else {
        // Refresh the current page
        const params = {
          page: pagination.number,
          size: pagination.size,
          search: searchTerm,
          status,
          fromDate,
          toDate,
          minPrice,
          maxPrice,
        }
        const response: PaginatedResponse = await bookingService.getAll(params)
        setBookings(response.content)
        setPagination({
          totalPages: response.totalPages,
          totalElements: response.totalElements,
          size: response.size,
          number: response.number,
        })
      }

      toast({
        title: "Booking deleted",
        description: "The booking has been deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting booking:", error)
      toast({
        title: "Error",
        description: "Failed to delete booking. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      await bookingService.updateStatus(id, newStatus)

      // Update local state
      setBookings(bookings.map((booking) => (booking.id === id ? { ...booking, status: newStatus } : booking)))

      toast({
        title: "Status updated",
        description: `Booking #${id} status has been updated to ${newStatus}.`,
      })
    } catch (error) {
      console.error("Error updating booking status:", error)
      toast({
        title: "Error",
        description: "Failed to update booking status. Please try again.",
        variant: "destructive",
      })
    }
  }

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

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p>Loading bookings...</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Bookings</h1>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
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
          <Button variant={status === "" ? "secondary" : "outline"} onClick={() => handleStatusFilter("")}>
            All
          </Button>
          <Button
            variant={status === "PENDING" ? "secondary" : "outline"}
            onClick={() => handleStatusFilter("PENDING")}
          >
            Pending
          </Button>
          <Button
            variant={status === "CONFIRMED" ? "secondary" : "outline"}
            onClick={() => handleStatusFilter("CONFIRMED")}
          >
            Confirmed
          </Button>
          <Button
            variant={status === "COMPLETED" ? "secondary" : "outline"}
            onClick={() => handleStatusFilter("COMPLETED")}
          >
            Completed
          </Button>
          <Button
            variant={status === "CANCELLED" ? "secondary" : "outline"}
            onClick={() => handleStatusFilter("CANCELLED")}
          >
            Cancelled
          </Button>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="relative">
            Filters
            {activeFiltersCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-xs text-white">
                {activeFiltersCount}
              </span>
            )}
          </Button>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" onClick={handleClearFilters} size="icon">
              <FilterX className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="mb-6 rounded-lg border bg-card p-4 shadow-sm">
          <h3 className="mb-4 font-medium">Advanced Filters</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 text-sm font-medium">Date Range</h4>
              <div className="flex flex-col gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        "Select date range"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="range" selected={dateRange} onSelect={handleDateRangeChange} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium">Price Range</h4>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                />
                <Button onClick={handlePriceRangeChange}>Apply</Button>
              </div>
            </div>
          </div>
        </div>
      )}

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
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>#{booking.id}</TableCell>
                <TableCell className="font-medium">{booking.homestayName}</TableCell>
                <TableCell>
                  <div>{booking.userName}</div>
                  <div className="text-xs text-muted-foreground">{booking.userEmail}</div>
                </TableCell>
                <TableCell>{booking.checkIn}</TableCell>
                <TableCell>{booking.checkOut}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                </TableCell>
                <TableCell>${booking.totalPrice}</TableCell>
                <TableCell>{format(new Date(booking.createdAt), "MMM d, yyyy")}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      {booking.status === "PENDING" && (
                        <DropdownMenuItem onClick={() => handleUpdateStatus(booking.id, "CONFIRMED")}>
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          Confirm Booking
                        </DropdownMenuItem>
                      )}
                      {(booking.status === "PENDING" || booking.status === "CONFIRMED") && (
                        <DropdownMenuItem onClick={() => handleUpdateStatus(booking.id, "CANCELLED")}>
                          <XCircle className="mr-2 h-4 w-4 text-red-500" />
                          Cancel Booking
                        </DropdownMenuItem>
                      )}
                      {booking.status === "CONFIRMED" && (
                        <DropdownMenuItem onClick={() => handleUpdateStatus(booking.id, "COMPLETED")}>
                          <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                          Mark as Completed
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setBookingToDelete(booking.id)
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
            {bookings.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {bookings.length} of {pagination.totalElements} bookings
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
            <DialogTitle>Are you sure you want to delete this booking?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the booking from the system.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => bookingToDelete && handleDeleteBooking(bookingToDelete)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
