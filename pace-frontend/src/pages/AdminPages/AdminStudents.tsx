import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { getAllStudentApi } from "@/api/taskApi";
import { useEffect, useState } from "react";

type User = {
  _id: string;
  username: string;
  email: string;
  batch: string;
  role: "student" | "seniorCordinator";
  isActive: boolean;
  isApproved: boolean;
  createdAt: string; // This comes from timestamps: true
};

function AdminStudents() {
  const [users, setUsers] = useState<User[]>([]);
  const fetchStudents = async () => {
    try {
      const response = await getAllStudentApi();
      if (response.data && response.data.users) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.log("failed to fetch tasks", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter users based on their role
  const students = users.filter((user) => user.role === "student");
  const seniorCoordinators = users.filter(
    (user) => user.role === "seniorCordinator"
  );

  // Helper function to render a user row (to avoid repetition)
  const renderUserRow = (user: User) => (
    <TableRow key={user._id}>
      <TableCell className="font-medium">{user.username}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.batch}</TableCell>
      <TableCell>
        <Badge variant={user.isActive ? "default" : "destructive"}>
          {user.isActive ? "Active" : "Inactive"}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant={user.isApproved ? "default" : "secondary"}>
          {user.isApproved ? "Approved" : "Pending"}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit User</DropdownMenuItem>
            <DropdownMenuItem>
              {user.isApproved ? "Revoke Approval" : "Approve User"}
            </DropdownMenuItem>
            <DropdownMenuItem>
              {user.isActive ? "Deactivate" : "Activate"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {/* Search and Add User Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full p-4 gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input
            type="text"
            placeholder="Search users..."
            className="w-full sm:w-64"
          />
          <Button
            type="submit"
            variant="outline"
            size="icon"
            className="sm:hidden"
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            type="submit"
            variant="outline"
            className="hidden sm:flex items-center gap-1"
          >
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>
        <Button className="flex items-center gap-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Students Table */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Students</h3>
        <Table>
          <TableCaption>A list of all student users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Approval</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.length > 0 ? (
              students.map(renderUserRow)
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Senior Coordinators Table */}
      <div className="p-4 mt-8">
        <h3 className="text-lg font-semibold mb-2">Senior Coordinators</h3>
        <Table>
          <TableCaption>A list of all senior coordinator users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Approval</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {seniorCoordinators.length > 0 ? (
              seniorCoordinators.map(renderUserRow)
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No senior coordinators found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default AdminStudents;
