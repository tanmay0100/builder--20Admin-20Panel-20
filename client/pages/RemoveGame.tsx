import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Trash2,
  AlertTriangle,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  GamepadIcon,
  X,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface GameData {
  id: string;
  name: string;
  category: string;
  status: "active" | "inactive" | "maintenance";
  totalBets: number;
  totalAmount: number;
  lastActivity: string;
  playerCount: number;
  featured: boolean;
}

export function RemoveGame() {
  const [games, setGames] = useState<GameData[]>([
    {
      id: "1",
      name: "SRIDEVI MORNING",
      category: "Morning Games",
      status: "active",
      totalBets: 234,
      totalAmount: 156000,
      lastActivity: "2024-01-15",
      playerCount: 89,
      featured: true,
    },
    {
      id: "2",
      name: "MILAN MORNING",
      category: "Morning Games",
      status: "active",
      totalBets: 189,
      totalAmount: 98000,
      lastActivity: "2024-01-15",
      playerCount: 67,
      featured: false,
    },
    {
      id: "3",
      name: "SRIDEVI",
      category: "Day Games",
      status: "active",
      totalBets: 312,
      totalAmount: 201000,
      lastActivity: "2024-01-15",
      playerCount: 124,
      featured: true,
    },
    {
      id: "4",
      name: "TIME BAZAR MORNING",
      category: "Morning Games",
      status: "inactive",
      totalBets: 45,
      totalAmount: 23000,
      lastActivity: "2024-01-10",
      playerCount: 12,
      featured: false,
    },
    {
      id: "5",
      name: "MADHURI",
      category: "Evening Games",
      status: "maintenance",
      totalBets: 67,
      totalAmount: 34000,
      lastActivity: "2024-01-12",
      playerCount: 23,
      featured: false,
    },
    {
      id: "6",
      name: "TIME BAZAR",
      category: "Day Games",
      status: "active",
      totalBets: 278,
      totalAmount: 178000,
      lastActivity: "2024-01-15",
      playerCount: 95,
      featured: false,
    },
    {
      id: "7",
      name: "TARA MUMBAI DAY",
      category: "Day Games",
      status: "active",
      totalBets: 156,
      totalAmount: 94000,
      lastActivity: "2024-01-15",
      playerCount: 56,
      featured: false,
    },
    {
      id: "8",
      name: "MADHUR DAY",
      category: "Day Games",
      status: "inactive",
      totalBets: 89,
      totalAmount: 45000,
      lastActivity: "2024-01-08",
      playerCount: 34,
      featured: false,
    },
    {
      id: "9",
      name: "MILAN DAY",
      category: "Day Games",
      status: "active",
      totalBets: 201,
      totalAmount: 123000,
      lastActivity: "2024-01-15",
      playerCount: 78,
      featured: false,
    },
    {
      id: "10",
      name: "RAJDHANI DAY",
      category: "Day Games",
      status: "active",
      totalBets: 145,
      totalAmount: 87000,
      lastActivity: "2024-01-15",
      playerCount: 45,
      featured: false,
    },
    {
      id: "11",
      name: "KALYAN",
      category: "Night Games",
      status: "active",
      totalBets: 356,
      totalAmount: 234000,
      lastActivity: "2024-01-15",
      playerCount: 156,
      featured: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const [gameToDelete, setGameToDelete] = useState<string | null>(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);

  const categories = [
    "all",
    "Morning Games",
    "Day Games",
    "Evening Games",
    "Night Games",
  ];

  const statusOptions = ["all", "active", "inactive", "maintenance"];

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch = game.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || game.status === statusFilter;
      const matchesCategory =
        categoryFilter === "all" || game.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [games, searchTerm, statusFilter, categoryFilter]);

  const handleDeleteGame = (gameId: string) => {
    const game = games.find((g) => g.id === gameId);
    if (!game) return;

    setGames((prev) => prev.filter((g) => g.id !== gameId));
    setGameToDelete(null);
    setSelectedGames((prev) => prev.filter((id) => id !== gameId));
    setDeleteSuccess(game.name);

    // Hide success message after 3 seconds
    setTimeout(() => setDeleteSuccess(null), 3000);

    console.log("Game deleted:", game.name);
    // Add API call here to delete the game
  };

  const handleBulkDelete = () => {
    const deletedGames = games.filter((g) => selectedGames.includes(g.id));
    setGames((prev) => prev.filter((g) => !selectedGames.includes(g.id)));
    setSelectedGames([]);
    setBulkDeleteOpen(false);
    setDeleteSuccess(`${deletedGames.length} games deleted`);

    // Hide success message after 3 seconds
    setTimeout(() => setDeleteSuccess(null), 3000);

    console.log(
      "Bulk delete:",
      deletedGames.map((g) => g.name),
    );
    // Add API call here for bulk deletion
  };

  const handleSelectGame = (gameId: string) => {
    setSelectedGames((prev) =>
      prev.includes(gameId)
        ? prev.filter((id) => id !== gameId)
        : [...prev, gameId],
    );
  };

  const handleSelectAll = () => {
    if (selectedGames.length === filteredGames.length) {
      setSelectedGames([]);
    } else {
      setSelectedGames(filteredGames.map((g) => g.id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-3 h-3" />;
      case "inactive":
        return <X className="w-3 h-3" />;
      case "maintenance":
        return <Clock className="w-3 h-3" />;
      default:
        return <AlertTriangle className="w-3 h-3" />;
    }
  };

  return (
    <div className="p-6 min-h-screen bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-destructive rounded-lg">
              <Trash2 className="w-5 h-5 text-destructive-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Remove Games
              </h1>
              <p className="text-muted-foreground">
                Delete games from the platform
              </p>
            </div>
          </div>
        </div>

        {/* Success Alert */}
        {deleteSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {deleteSuccess} removed successfully!
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search Games</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by game name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Status Filter</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status === "all" ? "All Status" : status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Category Filter</Label>
                  <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category === "all" ? "All Categories" : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Quick Actions</Label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchTerm("");
                        setStatusFilter("all");
                        setCategoryFilter("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </div>

              {/* Bulk Actions */}
              {selectedGames.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        {selectedGames.length} game(s) selected
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedGames([])}
                      >
                        Clear Selection
                      </Button>
                    </div>
                    <AlertDialog
                      open={bulkDeleteOpen}
                      onOpenChange={setBulkDeleteOpen}
                    >
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Selected
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete Multiple Games?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete {selectedGames.length} game(s) and remove all
                            associated data including results, bets, and
                            history.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleBulkDelete}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            Delete {selectedGames.length} Game(s)
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Games List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <GamepadIcon className="w-5 h-5" />
                  Games ({filteredGames.length})
                </span>
                {filteredGames.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={
                        selectedGames.length === filteredGames.length &&
                        filteredGames.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                    <Label className="text-sm">Select All</Label>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredGames.length === 0 ? (
                <div className="text-center py-12">
                  <GamepadIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    No games found
                  </h3>
                  <p className="text-muted-foreground">
                    {games.length === 0
                      ? "No games available to remove"
                      : "Try adjusting your filters to see more games"}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredGames.map((game) => (
                    <div
                      key={game.id}
                      className={`flex items-center gap-4 p-4 border rounded-lg transition-all hover:shadow-sm ${
                        selectedGames.includes(game.id)
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                    >
                      {/* Selection Checkbox */}
                      <Checkbox
                        checked={selectedGames.includes(game.id)}
                        onCheckedChange={() => handleSelectGame(game.id)}
                      />

                      {/* Game Icon */}
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <GamepadIcon className="w-5 h-5 text-primary" />
                      </div>

                      {/* Game Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground truncate">
                            {game.name}
                          </h3>
                          {game.featured && (
                            <Badge className="text-xs bg-yellow-100 text-yellow-800">
                              Featured
                            </Badge>
                          )}
                          <Badge
                            className={`text-xs ${getStatusColor(game.status)}`}
                          >
                            {getStatusIcon(game.status)}
                            <span className="ml-1 capitalize">
                              {game.status}
                            </span>
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{game.category}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {game.playerCount} players
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {game.totalBets} bets
                          </span>
                          <span>•</span>
                          <span>₹{game.totalAmount.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Last Activity */}
                      <div className="text-right min-w-0">
                        <div className="text-sm text-muted-foreground">
                          Last activity
                        </div>
                        <div className="text-sm font-medium">
                          {new Date(game.lastActivity).toLocaleDateString(
                            "en-IN",
                          )}
                        </div>
                      </div>

                      {/* Delete Button */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setGameToDelete(game.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the game "{game.name}" and
                              remove all associated data including:
                              <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>{game.totalBets} betting records</li>
                                <li>
                                  ₹{game.totalAmount.toLocaleString()} in
                                  transaction history
                                </li>
                                <li>{game.playerCount} player associations</li>
                                <li>All historical results and analytics</li>
                              </ul>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteGame(game.id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Delete Game
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Warning Information */}
          {filteredGames.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Important Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground mb-1">
                        Data Loss Warning
                      </p>
                      <p>
                        Removing a game will permanently delete all associated
                        data including player bets, results history, statistics,
                        and financial records. This action cannot be undone.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground mb-1">
                        Recommended Actions
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Export game data and reports before deletion</li>
                        <li>Notify active players about game removal</li>
                        <li>
                          Consider setting games to "inactive" instead of
                          deletion
                        </li>
                        <li>Review financial implications with accounting</li>
                      </ul>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground mb-1">
                        Processing Time
                      </p>
                      <p>
                        Game deletion may take several minutes to complete as
                        all related data needs to be processed and removed from
                        multiple systems.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
