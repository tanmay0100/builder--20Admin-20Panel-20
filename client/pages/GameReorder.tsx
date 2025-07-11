import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GripVertical, ArrowUp, ArrowDown } from "lucide-react";

export function GameReorder() {
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

  const moveGame = (index: number, direction: "up" | "down") => {
    const newGames = [...games];
    if (direction === "up" && index > 0) {
      [newGames[index], newGames[index - 1]] = [
        newGames[index - 1],
        newGames[index],
      ];
    } else if (direction === "down" && index < newGames.length - 1) {
      [newGames[index], newGames[index + 1]] = [
        newGames[index + 1],
        newGames[index],
      ];
    }
    setGames(newGames);
  };

  const handleSave = () => {
    console.log("Game order saved:", games);
    // Add API call here to save the new order
  };

  const resetOrder = () => {
    setGames([
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
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Game Reorder</h1>
        <p className="text-muted-foreground">
          Reorder games as they appear on the homepage
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Game Order Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {games.map((game, index) => (
              <div
                key={game}
                className="flex items-center gap-3 p-3 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
              >
                <GripVertical className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <span className="font-medium">{game}</span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    #{index + 1}
                  </span>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => moveGame(index, "up")}
                    disabled={index === 0}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => moveGame(index, "down")}
                    disabled={index === games.length - 1}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-6">
            <Button
              onClick={handleSave}
              className="bg-primary hover:bg-primary/90"
            >
              Save Order
            </Button>
            <Button onClick={resetOrder} variant="outline">
              Reset to Default
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
