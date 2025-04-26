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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Search, MoreHorizontal, Edit, Trash2, UserPlus, Shield, ShieldOff } from "lucide-react"
import { format } from "date-fns"

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "USER",
    bookingsCount: 5,
    createdAt: "2023-01-15T14:30:00Z",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "USER",
    bookingsCount: 3,
    createdAt: "2023-02-20T09:45:00Z",
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@goodplacetravel.com",
    role: "ADMIN",
    bookingsCount: 0,
    createdAt: "2023-01-01T00:00:00Z",
  },
  {
    id: 4,
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "USER",
    bookingsCount: 2,
    createdAt: "2023-03-10T16:20:00Z",
  },
  {
    id: 5,
    name: "Emily Davis",
    email: "emily@example.com",
    role: "USER",
    bookingsCount: 1,
    createdAt: "2023-04-05T11:10:00Z",
  },
]

export default function AdminUsersPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState(mockUsers)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<number | null>(null)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  useEffect(() => {
    // In a real app, this would fetch data from the API
    // For now, we'll use the mock data
    const fetchUsers = async () => {
      try {
        // const response = await fetch('/api/admin/users')
        // const data = await response.json()
        // setUsers(data)
      } catch (error) {
        console.error("Error fetching users:", error)
        toast({
          title: "Error",
          description: "Failed to load users",
          variant: "destructive",
        })
      }
    }

    fetchUsers()
  }, [toast])

  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedRole === null || user.role === selectedRole),
  )

  const handleDeleteUser = async (id: number) => {
    try {
      // In a real app, this would call the API
      // await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })

      // Update local state
      setUsers(users.filter((user) => user.id !== id))
      setUserToDelete(null)
      setIsDeleteDialogOpen(false)

      toast({
        title: "User deleted",
        description: "The user has been deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting user:", error)
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      })
    }
  }

  const handleToggleRole = async (id: number, currentRole: string) => {
    try {
      const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN"

      // In a real app, this would call the API
      // await fetch(`/api/admin/users/${id}/role`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ role: newRole })
      // })

      // Update local state
      setUsers(users.map((user) => (user.id === id ? { ...user, role: newRole } : user)))

      toast({
        title: "Role updated",
        description: `User's role has been updated to ${newRole}.`,
      })
    } catch (error) {
      console.error("Error updating user role:", error)
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      })
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <UserPlus className="mr-2 h-4 w-4" />
              Add New User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account. The user will receive an email with instructions to set their password.
              </DialogDescription>
            </DialogHeader>
            {/* User creation form would go here */}
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Name
                </label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right">
                  Email
                </label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="role" className="text-right">
                  Role
                </label>
                <select id="role" className="col-span-3 rounded-md border p-2">
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                Create User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant={selectedRole === null ? "secondary" : "outline"} onClick={() => setSelectedRole(null)}>
            All
          </Button>
          <Button variant={selectedRole === "USER" ? "secondary" : "outline"} onClick={() => setSelectedRole("USER")}>
            Users
          </Button>
          <Button variant={selectedRole === "ADMIN" ? "secondary" : "outline"} onClick={() => setSelectedRole("ADMIN")}>
            Admins
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>#{user.id}</TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    className={user.role === "ADMIN" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{user.bookingsCount}</TableCell>
                <TableCell>{format(new Date(user.createdAt), "MMM d, yyyy")}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit User
                      </DropdownMenuItem>
                      {user.role === "USER" ? (
                        <DropdownMenuItem onClick={() => handleToggleRole(user.id, user.role)}>
                          <Shield className="mr-2 h-4 w-4 text-purple-500" />
                          Make Admin
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => handleToggleRole(user.id, user.role)}>
                          <ShieldOff className="mr-2 h-4 w-4 text-blue-500" />
                          Remove Admin
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setUserToDelete(user.id)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the user account and all associated data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => userToDelete && handleDeleteUser(userToDelete)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
