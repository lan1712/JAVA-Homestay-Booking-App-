"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Edit, Trash2, Search } from "lucide-react"

export function AdminUserTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  // This would be fetched from the API in a real application
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "USER", createdAt: "2023-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "USER", createdAt: "2023-02-20" },
    { id: 3, name: "Admin User", email: "admin@example.com", role: "ADMIN", createdAt: "2023-01-01" },
    { id: 4, name: "Bob Johnson", email: "bob@example.com", role: "USER", createdAt: "2023-03-10" },
    { id: 5, name: "Alice Brown", email: "alice@example.com", role: "USER", createdAt: "2023-04-05" },
  ]

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: number) => {
    // This would be a real API call in production
    // await fetch(`/api/users/${id}`, {
    //   method: "DELETE",
    //   headers: {
    //     "Authorization": `Bearer ${localStorage.getItem("token")}`
    //   }
    // })

    toast({
      title: "User deleted",
      description: `User ID ${id} has been deleted.`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">Add New User</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      user.role === "ADMIN" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
