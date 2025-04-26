import axios from "axios"

// Create an axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/auth/login"
    }
    return Promise.reject(error)
  },
)

// API service functions
export const homestayService = {
  getAll: async (params = {}) => {
    const response = await api.get("/homestays", { params })
    return response.data
  },

  getById: async (id: number) => {
    const response = await api.get(`/homestays/${id}`)
    return response.data
  },

  create: async (homestay: any) => {
    const response = await api.post("/homestays", homestay)
    return response.data
  },

  update: async (id: number, homestay: any) => {
    const response = await api.put(`/homestays/${id}`, homestay)
    return response.data
  },

  delete: async (id: number) => {
    const response = await api.delete(`/homestays/${id}`)
    return response.data
  },

  toggleFeatured: async (id: number) => {
    const response = await api.post(`/homestays/${id}/toggle-featured`)
    return response.data
  },

  getImages: async (id: number) => {
    const response = await api.get(`/homestays/${id}/images`)
    return response.data
  },

  uploadImages: async (id: number, formData: FormData) => {
    const response = await api.post(`/homestays/${id}/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  },

  deleteImage: async (imageId: number) => {
    const response = await api.delete(`/homestay-images/${imageId}`)
    return response.data
  },

  setPrimaryImage: async (homestayId: number, imageId: number) => {
    const response = await api.post(`/homestays/${homestayId}/primary-image/${imageId}`)
    return response.data
  },
}

export const bookingService = {
  getAll: async (params = {}) => {
    const response = await api.get("/bookings", { params })
    return response.data
  },

  getById: async (id: number) => {
    const response = await api.get(`/bookings/${id}`)
    return response.data
  },

  updateStatus: async (id: number, status: string) => {
    const response = await api.put(`/bookings/${id}/status`, { status })
    return response.data
  },

  delete: async (id: number) => {
    const response = await api.delete(`/bookings/${id}`)
    return response.data
  },
}

export const userService = {
  getAll: async (params = {}) => {
    const response = await api.get("/users/all", { params })
    return response.data
  },

  getById: async (id: number) => {
    const response = await api.get(`/users/${id}`)
    return response.data
  },

  create: async (user: any) => {
    const response = await api.post("/users", user)
    return response.data
  },

  update: async (id: number, user: any) => {
    const response = await api.put(`/users/${id}`, user)
    return response.data
  },

  updateRole: async (id: number, role: string) => {
    const response = await api.put(`/users/${id}/role`, { role })
    return response.data
  },

  delete: async (id: number) => {
    const response = await api.delete(`/users/${id}`)
    return response.data
  },
}

export const reviewService = {
  getAll: async (params = {}) => {
    const response = await api.get("/reviews", { params })
    return response.data
  },

  getByHomestayId: async (homestayId: number) => {
    const response = await api.get(`/reviews/homestay/${homestayId}`)
    return response.data
  },

  getById: async (id: number) => {
    const response = await api.get(`/reviews/${id}`)
    return response.data
  },

  update: async (id: number, review: any) => {
    const response = await api.put(`/reviews/${id}`, review)
    return response.data
  },

  delete: async (id: number) => {
    const response = await api.delete(`/reviews/${id}`)
    return response.data
  },
}

export const dashboardService = {
  getStats: async () => {
    const response = await api.get("/admin/dashboard/stats")
    return response.data
  },

  getBookingTrends: async () => {
    const response = await api.get("/admin/dashboard/booking-trends")
    return response.data
  },

  getRevenueTrends: async () => {
    const response = await api.get("/admin/dashboard/revenue-trends")
    return response.data
  },

  getRecentBookings: async () => {
    const response = await api.get("/admin/dashboard/recent-bookings")
    return response.data
  },
}

export default api
