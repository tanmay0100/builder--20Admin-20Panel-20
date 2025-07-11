import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  UserPlus,
  UserMinus,
  Search,
  Users,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Plus,
} from "lucide-react";

export function AddRemoveUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    initialBalance: "",
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "+91 98765 43210",
      joinDate: "2024-01-15",
      status: "active",
      walletBalance: 12450,
      totalBets: 156,
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91 87654 32109",
      joinDate: "2024-02-20",
      status: "active",
      walletBalance: 8920,
      totalBets: 89,
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit@example.com",
      phone: "+91 76543 21098",
      joinDate: "2023-11-10",
      status: "inactive",
      walletBalance: 3450,
      totalBets: 234,
    },
    {
      id: 4,
      name: "Sunita Devi",
      email: "sunita@example.com",
      phone: "+91 65432 10987",
      joinDate: "2024-03-05",
      status: "active",
      walletBalance: 15670,
      totalBets: 67,
    },
    {
      id: 5,
      name: "Mohammad Ali",
      email: "mohammad@example.com",
      phone: "+91 54321 09876",
      joinDate: "2023-12-08",
      status: "suspended",
      walletBalance: 0,
      totalBets: 345,
    },
  ]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm),
  );

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.phone) {
      const user = {
        id: Date.now(),
        ...newUser,
        joinDate: new Date().toISOString().split("T")[0],
        status: "active" as const,
        walletBalance: parseFloat(newUser.initialBalance) || 0,
        totalBets: 0,
      };
      setUsers((prev) => [...prev, user]);
      setNewUser({
        name: "",
        email: "",
        phone: "",
        initialBalance: "",
      });
      console.log("User added:", user);
    }
  };

  const handleRemoveUser = (userId: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
    console.log("User removed:", userId);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Inactive</Badge>
        );
      case "suspended":
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Suspended
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 bg-gradient-light min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
          👥 Add/Remove Users
        </h1>
        <p className="text-muted-foreground">
          Add new users to the platform or remove existing users
        </p>
      </div>

      <div className="grid gap-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-800">Total Users</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">{users.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-100 to-emerald-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">
                  Active Users
                </span>
              </div>
              <p className="text-2xl font-bold text-green-900">
                {users.filter((u) => u.status === "active").length}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-red-100 to-pink-100 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-red-800">
                  Suspended Users
                </span>
              </div>
              <p className="text-2xl font-bold text-red-900">
                {users.filter((u) => u.status === "suspended").length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Add New User */}
        <Card className="shadow-soft border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-6 h-6" />➕ Add New User
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newUser.phone}
                  onChange={(e) =>
                    setNewUser((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="initialBalance">
                  Initial Wallet Balance (₹)
                </Label>
                <Input
                  id="initialBalance"
                  type="number"
                  value={newUser.initialBalance}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      initialBalance: e.target.value,
                    }))
                  }
                  placeholder="0"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <Button
                onClick={handleAddUser}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                <Plus className="w-4 h-4 mr-2" />➕ Add User
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  setNewUser({
                    name: "",
                    email: "",
                    phone: "",
                    initialBalance: "",
                  })
                }
                className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                🔄 Clear Form
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card className="shadow-soft border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <UserMinus className="w-6 h-6" />
              👥 Manage Existing Users
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Search */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Users Table */}
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>User Details</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Wallet Balance</TableHead>
                    <TableHead>Total Bets</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {user.email}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {user.joinDate}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>
                        <span className="font-semibold text-green-600">
                          ₹{user.walletBalance.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-600">{user.totalBets}</span>
                      </TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="bg-red-100 text-red-800 hover:bg-red-200"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Remove
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                ⚠️ Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the user "{user.name}" and
                                remove all their data including:
                                <br />
                                <br />
                                • All bet history and transactions
                                <br />• Wallet balance of ₹
                                {user.walletBalance.toLocaleString()}
                                <br />
                                �� Account information and preferences
                                <br />
                                <br />
                                <strong>
                                  This action is irreversible and the user will
                                  lose access to the platform immediately.
                                </strong>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleRemoveUser(user.id)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                🗑️ Delete User Permanently
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">
                  No users found matching your search criteria
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Warning Notice */}
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <p className="font-medium text-red-800 text-sm">
                ⚠️ Important Warning
              </p>
              <p className="text-sm text-red-700">
                Removing users will permanently delete all their data including
                bet history, wallet balance, and account information. This
                action cannot be undone. Please ensure you have proper
                authorization before removing any users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
