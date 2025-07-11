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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Wallet,
  Plus,
  Minus,
  Search,
  CreditCard,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from "lucide-react";

export function WalletBalances() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [transactionType, setTransactionType] = useState<"add" | "subtract">(
    "add",
  );
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "+91 98765 43210",
      walletBalance: 12450,
      totalDeposits: 25000,
      totalWithdrawals: 12550,
      lastTransaction: "2024-03-15",
      status: "active",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91 87654 32109",
      walletBalance: 8920,
      totalDeposits: 15000,
      totalWithdrawals: 6080,
      lastTransaction: "2024-03-14",
      status: "active",
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit@example.com",
      phone: "+91 76543 21098",
      walletBalance: 3450,
      totalDeposits: 45000,
      totalWithdrawals: 41550,
      lastTransaction: "2024-03-10",
      status: "inactive",
    },
    {
      id: 4,
      name: "Sunita Devi",
      email: "sunita@example.com",
      phone: "+91 65432 10987",
      walletBalance: 15670,
      totalDeposits: 20000,
      totalWithdrawals: 4330,
      lastTransaction: "2024-03-15",
      status: "active",
    },
    {
      id: 5,
      name: "Mohammad Ali",
      email: "mohammad@example.com",
      phone: "+91 54321 09876",
      walletBalance: 0,
      totalDeposits: 30000,
      totalWithdrawals: 30000,
      lastTransaction: "2024-03-12",
      status: "suspended",
    },
  ]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm),
  );

  const handleTransaction = () => {
    if (!selectedUser || !amount || !reason) return;

    const transactionAmount = parseFloat(amount);
    const newBalance =
      transactionType === "add"
        ? selectedUser.walletBalance + transactionAmount
        : selectedUser.walletBalance - transactionAmount;

    setUsers((prev) =>
      prev.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              walletBalance: Math.max(0, newBalance),
              lastTransaction: new Date().toISOString().split("T")[0],
            }
          : user,
      ),
    );

    setSelectedUser(null);
    setAmount("");
    setReason("");
    console.log(
      `${transactionType === "add" ? "Added" : "Subtracted"} ₹${amount} ${transactionType === "add" ? "to" : "from"} ${selectedUser.name}'s wallet. Reason: ${reason}`,
    );
  };

  const totalWalletBalance = users.reduce(
    (sum, user) => sum + user.walletBalance,
    0,
  );

  return (
    <div className="p-6 bg-gradient-light min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
          💰 Manage Wallet Balances
        </h1>
        <p className="text-muted-foreground">
          Add or subtract funds from user wallets and monitor transactions
        </p>
      </div>

      <div className="grid gap-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-800">
                  Total Wallet Balance
                </span>
              </div>
              <p className="text-2xl font-bold text-blue-900">
                ₹{totalWalletBalance.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-100 to-emerald-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">
                  Total Deposits
                </span>
              </div>
              <p className="text-2xl font-bold text-green-900">
                ₹
                {users
                  .reduce((sum, user) => sum + user.totalDeposits, 0)
                  .toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-100 to-red-100 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-orange-800">
                  Total Withdrawals
                </span>
              </div>
              <p className="text-2xl font-bold text-orange-900">
                ₹
                {users
                  .reduce((sum, user) => sum + user.totalWithdrawals, 0)
                  .toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-800">
                  Active Wallets
                </span>
              </div>
              <p className="text-2xl font-bold text-purple-900">
                {users.filter((u) => u.walletBalance > 0).length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Table */}
        <Card className="shadow-soft border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-6 h-6" />
              💳 User Wallet Management
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
                    <TableHead>Current Balance</TableHead>
                    <TableHead>Total Deposits</TableHead>
                    <TableHead>Total Withdrawals</TableHead>
                    <TableHead>Last Transaction</TableHead>
                    <TableHead>Status</TableHead>
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
                        <span
                          className={`font-bold text-lg ${user.walletBalance > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          ₹{user.walletBalance.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-green-600">
                          ₹{user.totalDeposits.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-orange-600">
                          ₹{user.totalWithdrawals.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {user.lastTransaction}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            user.status === "active"
                              ? "bg-green-100 text-green-800"
                              : user.status === "suspended"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedUser(user)}
                                className="text-green-600 border-green-300 hover:bg-green-50"
                              >
                                <Plus className="w-4 h-4 mr-1" />
                                Add
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  💰 Add Funds to Wallet
                                </DialogTitle>
                                <DialogDescription>
                                  Add money to {selectedUser?.name}'s wallet
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="add-amount">Amount (₹)</Label>
                                  <Input
                                    id="add-amount"
                                    type="number"
                                    value={amount}
                                    onChange={(e) => {
                                      setAmount(e.target.value);
                                      setTransactionType("add");
                                    }}
                                    placeholder="Enter amount to add"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="add-reason">Reason</Label>
                                  <Input
                                    id="add-reason"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    placeholder="Reason for adding funds"
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  onClick={handleTransaction}
                                  className="bg-green-500 hover:bg-green-600"
                                >
                                  💰 Add Funds
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedUser(user)}
                                className="text-red-600 border-red-300 hover:bg-red-50"
                              >
                                <Minus className="w-4 h-4 mr-1" />
                                Subtract
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  💸 Subtract Funds from Wallet
                                </DialogTitle>
                                <DialogDescription>
                                  Remove money from {selectedUser?.name}'s
                                  wallet
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="subtract-amount">
                                    Amount (₹)
                                  </Label>
                                  <Input
                                    id="subtract-amount"
                                    type="number"
                                    value={amount}
                                    onChange={(e) => {
                                      setAmount(e.target.value);
                                      setTransactionType("subtract");
                                    }}
                                    placeholder="Enter amount to subtract"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="subtract-reason">
                                    Reason
                                  </Label>
                                  <Input
                                    id="subtract-reason"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    placeholder="Reason for subtracting funds"
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  onClick={handleTransaction}
                                  className="bg-red-500 hover:bg-red-600"
                                >
                                  💸 Subtract Funds
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
