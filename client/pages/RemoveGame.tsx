import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, AlertTriangle } from "lucide-react";
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

export function RemoveGame() {
  const [games, setGames] = useState([
    "SRIDEVI MORNING",
    "MILAN MORNING",
    "SRIDEVI",
    "TIME BAZAR MORNING",
    "MADHURI",
    "TIME BAZAR",
    "TARA MUMBAI DAY",
    "MADHUR DAY",
    "MILAN DAY",
    "RAJDHANI DAY",
    "KALYAN",
  ]);

  const [gameToDelete, setGameToDelete] = useState<string | null>(null);

  const handleDeleteGame = (gameName: string) => {
    setGames((prev) => prev.filter((game) => game !== gameName));
    setGameToDelete(null);
    console.log("Game deleted:", gameName);
    // Add API call here to delete the game
  };

  return (
    <div className="p-6 bg-gradient-light min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
          🗑️ Remove Game
        </h1>
        <p className="text-muted-foreground">Delete games from the platform</p>
      </div>

      <Card className="max-w-2xl shadow-soft border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            ⚠️ Game Removal
          </CardTitle>
        </CardHeader>
        <CardContent>
          {games.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No games available to remove
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {games.map((game) => (
                <div
                  key={game}
                  className="flex items-center justify-between p-4 border-2 border-red-100 rounded-lg bg-gradient-to-r from-white to-red-50 hover:from-red-50 hover:to-red-100 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">🎮</span>
                    </div>
                    <span className="font-semibold text-gray-800">{game}</span>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setGameToDelete(game)}
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
                          This action cannot be undone. This will permanently
                          delete the game "{game}" and remove all associated
                          data including results, bets, and history.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteGame(game)}
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

          {games.length > 0 && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Warning</p>
                  <p className="text-sm text-muted-foreground">
                    Removing a game will permanently delete all associated data
                    including player bets, results history, and statistics. This
                    action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
