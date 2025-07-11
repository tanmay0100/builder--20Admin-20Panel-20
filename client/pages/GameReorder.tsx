import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GripVertical,
  ArrowUp,
  ArrowDown,
  Save,
  RotateCcw,
  CheckCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface GameItem {
  id: string;
  name: string;
  isActive: boolean;
}

export function GameReorder() {
  const [games, setGames] = useState<GameItem[]>([
    { id: "1", name: "SRIDEVI MORNING", isActive: true },
    { id: "2", name: "MILAN MORNING", isActive: true },
    { id: "3", name: "SRIDEVI", isActive: true },
    { id: "4", name: "TIME BAZAR MORNING", isActive: true },
    { id: "5", name: "MADHURI", isActive: false },
    { id: "6", name: "TIME BAZAR", isActive: true },
    { id: "7", name: "TARA MUMBAI DAY", isActive: true },
    { id: "8", name: "MADHUR DAY", isActive: true },
    { id: "9", name: "MILAN DAY", isActive: true },
    { id: "10", name: "RAJDHANI DAY", isActive: true },
    { id: "11", name: "KALYAN", isActive: true },
  ]);

  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const originalOrder = [
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
  ];

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedItem === null) return;

    const newGames = [...games];
    const draggedGame = newGames[draggedItem];

    newGames.splice(draggedItem, 1);
    newGames.splice(dropIndex, 0, draggedGame);

    setGames(newGames);
    setDraggedItem(null);
    setHasChanges(true);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const moveGame = (index: number, direction: "up" | "down") => {
    const newGames = [...games];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newGames.length) return;

    [newGames[index], newGames[targetIndex]] = [
      newGames[targetIndex],
      newGames[index],
    ];

    setGames(newGames);
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(
        "Game order saved:",
        games.map((g) => g.name),
      );
      setHasChanges(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save game order:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const resetOrder = () => {
    const resetGames = originalOrder.map((name, index) => ({
      id: (index + 1).toString(),
      name,
      isActive: name !== "MADHURI",
    }));
    setGames(resetGames);
    setHasChanges(true);
  };

  return (
    <div className="p-6 min-h-screen bg-background">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Game Reorder
          </h1>
          <p className="text-muted-foreground">
            Drag and drop games to change their order on the homepage
          </p>
        </div>

        {/* Success Alert */}
        {saveSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Game order saved successfully!
            </AlertDescription>
          </Alert>
        )}

        {/* Main Card */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Games ({games.length})</CardTitle>
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  disabled={!hasChanges || isSaving}
                  size="sm"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Order"}
                </Button>
                <Button onClick={resetOrder} variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {games.map((game, index) => (
              <div
                key={game.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`group flex items-center gap-3 p-3 border rounded-lg cursor-move transition-all hover:shadow-sm ${
                  draggedItem === index
                    ? "opacity-50 scale-95"
                    : "hover:border-primary/30"
                } ${
                  game.isActive
                    ? "bg-card border-border"
                    : "bg-muted border-muted-foreground/20"
                }`}
              >
                {/* Drag Handle */}
                <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0" />

                {/* Position Number */}
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </div>

                {/* Game Name */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground truncate">
                      {game.name}
                    </span>
                    {!game.isActive && (
                      <Badge variant="secondary" className="text-xs">
                        Inactive
                      </Badge>
                    )}
                    {index < 3 && (
                      <Badge className="text-xs bg-yellow-100 text-yellow-800">
                        TOP 3
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Move Buttons */}
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => moveGame(index, "up")}
                    disabled={index === 0}
                    className="w-8 h-8 p-0"
                  >
                    <ArrowUp className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => moveGame(index, "down")}
                    disabled={index === games.length - 1}
                    className="w-8 h-8 p-0"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Help Text */}
        {hasChanges && (
          <div className="text-center">
            <p className="text-sm text-orange-600 bg-orange-50 border border-orange-200 rounded-lg py-2 px-4 inline-block">
              ⚠️ You have unsaved changes. Remember to save your new order.
            </p>
          </div>
        )}

        <div className="text-center text-sm text-muted-foreground mt-6">
          <p>
            💡 <strong>Tip:</strong> Drag games to reorder them, or use the
            arrow buttons to move one position at a time.
          </p>
        </div>
      </div>
    </div>
  );
}
