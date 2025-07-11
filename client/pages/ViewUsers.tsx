import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
} from "lucide-react";

export function ViewUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [users] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "+91 98765 43210",
      status: "active",
      joinDate: "2024-01-15",
      totalBets: 156,
      totalWinnings: "₹45,230",
      walletBalance: "₹12,450",
      lastActivity: "2 hours ago",
      gamesPlayed: ["Satta Matka", "Color King", "Lucky Numbers"],
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91 87654 32109",
      status: "active",
      joinDate: "2024-02-20",
      totalBets: 89,
      totalWinnings: "₹23,670",
      walletBalance: "₹8,920",
      lastActivity: "1 day ago",
      gamesPlayed: ["Time Bazar", "Milan Day", "Kalyan"],
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit@example.com",
      phone: "+91 76543 21098",
      status: "inactive",
      joinDate: "2023-11-10",
      totalBets: 234,
      totalWinnings: "₹67,890",
      walletBalance: "₹3,450",
      lastActivity: "1 week ago",
      gamesPlayed: ["Sridevi", "Madhuri", "Card Master"],
    },
    {
      id: 4,
      name: "Sunita Devi",
      email: "sunita@example.com",
      phone: "+91 65432 10987",
      status: "active",
      joinDate: "2024-03-05",
      totalBets: 67,
      totalWinnings: "₹18,950",
      walletBalance: "₹15,670",
      lastActivity: "5 minutes ago",
      gamesPlayed: ["Roll Dice", "Color King"],
    },
    {
      id: 5,
      name: "Mohammad Ali",
      email: "mohammad@example.com",
      phone: "+91 54321 09876",
      status: "suspended",
      joinDate: "2023-12-08",
      totalBets: 345,
      totalWinnings: "₹89,120",
      walletBalance: "₹0",
      lastActivity: "3 days ago",
      gamesPlayed: ["Satta Matka", "Time Bazar", "Kalyan"],
    },
  ]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800">
            <Activity className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Eye className="w-3 h-3 mr-1" />
            Inactive
          </Badge>
        );
      case "suspended":
        return (
          <Badge className="bg-red-100 text-red-800">
            <TrendingDown className="w-3 h-3 mr-1" />
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
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">
          👥 View Users & Participation
        </h1>
        <p className="text-muted-foreground">
          Monitor user activity, participation, and gaming statistics
        </p>
      </div>

      <Card className="shadow-soft border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-6 h-6" />
            📊 User Management Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-800">Total Users</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">{users.length}</p>
            </div>
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">
                  Active Users
                </span>
              </div>
              <p className="text-2xl font-bold text-green-900">
                {users.filter((u) => u.status === "active").length}
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-yellow-800">
                  Total Bets
                </span>
              </div>
              <p className="text-2xl font-bold text-yellow-900">
                {users.reduce((sum, user) => sum + user.totalBets, 0)}
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-800">
                  Total Winnings
                </span>
              </div>
              <p className="text-2xl font-bold text-purple-900">₹2,44,860</p>
            </div>
          </div>

          {/* Users Table */}
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>User Details</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Participation</TableHead>
                  <TableHead>Wallet Balance</TableHead>
                  <TableHead>Games Played</TableHead>
                  <TableHead>Last Activity</TableHead>
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
                        <div className="text-xs text-gray-400">
                          Joined: {user.joinDate}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {user.totalBets} bets
                        </div>
                        <div className="text-sm text-green-600">
                          Won: {user.totalWinnings}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-blue-600">
                        {user.walletBalance}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.gamesPlayed.slice(0, 2).map((game) => (
                          <Badge
                            key={game}
                            variant="outline"
                            className="text-xs"
                          >
                            {game}
                          </Badge>
                        ))}
                        {user.gamesPlayed.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{user.gamesPlayed.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {user.lastActivity}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
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
                No users found matching your criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
