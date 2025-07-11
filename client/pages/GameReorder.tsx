import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  GripVertical,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Save,
  AlertCircle,
  CheckCircle,
  Gamepad2,
  Crown,
  Star,
  Target,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface GameItem {
  id: string;
  name: string;
  isActive: boolean;
  popularity: number;
}

export function GameReorder() {
  const [games, setGames] = useState<GameItem[]>([
    {
      id: "1",
      name: "SRIDEVI MORNING",
      isActive: true,
      popularity: 95,
    },
    {
      id: "2",
      name: "MILAN MORNING",
      isActive: true,
      popularity: 88,
    },
    {
      id: "3",
      name: "SRIDEVI",
      isActive: true,
      popularity: 92,
    },
    {
      id: "4",
      name: "TIME BAZAR MORNING",
      isActive: true,
      popularity: 75,
    },
    {
      id: "5",
      name: "MADHURI",
      isActive: false,
      popularity: 82,
    },
    {
      id: "6",
      name: "TIME BAZAR",
      isActive: true,
      popularity: 89,
    },
    {
      id: "7",
      name: "TARA MUMBAI DAY",
      isActive: true,
      popularity: 78,
    },
    {
      id: "8",
      name: "MADHUR DAY",
      isActive: true,
      popularity: 84,
    },
    {
      id: "9",
      name: "MILAN DAY",
      isActive: true,
      popularity: 91,
    },
    {
      id: "10",
      name: "RAJDHANI DAY",
      isActive: true,
      popularity: 86,
    },
    {
      id: "11",
      name: "KALYAN",
      isActive: true,
      popularity: 97,
    },
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

  const getGameIcon = (index: number) => {
    if (index === 0) return <Crown className="w-4 h-4 text-yellow-600" />;
    if (index < 3) return <Star className="w-4 h-4 text-orange-500" />;
    return <Target className="w-4 h-4 text-blue-500" />;
  };

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

  const moveToPosition = (index: number, position: "top" | "bottom") => {
    const newGames = [...games];
    const game = newGames.splice(index, 1)[0];

    if (position === "top") {
      newGames.unshift(game);
    } else {
      newGames.push(game);
    }

    setGames(newGames);
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log(
        "Game order saved:",
        games.map((g) => g.name),
      );
      setHasChanges(false);
      setSaveSuccess(true);

      // Hide success message after 3 seconds
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
      isActive: name !== "MADHURI", // Example: MADHURI is inactive
      popularity: Math.floor(Math.random() * 30) + 70, // Random popularity between 70-100
    }));

    setGames(resetGames);
    setHasChanges(true);
  };

  return (
    <div className="p-6 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <Gamepad2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Game Reorder
              </h1>
              <p className="text-muted-foreground">
                Drag and drop or use controls to reorder games as they appear on
                the homepage
              </p>
            </div>
          </div>
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

        {/* Changes Alert */}
        {hasChanges && !saveSuccess && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              You have unsaved changes. Remember to save your new game order.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Actions</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {games.length} games total
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {games.filter((g) => g.isActive).length} active
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button
                  onClick={handleSave}
                  disabled={!hasChanges || isSaving}
                  className="min-w-[120px]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Order"}
                </Button>
                <Button
                  onClick={resetOrder}
                  variant="outline"
                  className="min-w-[120px]"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset to Default
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Game List */}
          <Card>
            <CardHeader>
              <CardTitle>Game Order Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {games.map((game, index) => (
                  <div
                    key={game.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`group relative flex items-center gap-4 p-4 border rounded-lg transition-all duration-200 cursor-move hover:shadow-md ${
                      draggedItem === index
                        ? "opacity-50 scale-95"
                        : "hover:border-primary/20"
                    } ${
                      game.isActive
                        ? "bg-card border-border"
                        : "bg-muted border-muted-foreground/20"
                    }`}
                  >
                    {/* Drag Handle */}
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                      <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                        {getGameIcon(index)}
                      </div>
                    </div>

                    {/* Game Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground">
                          {game.name}
                        </span>
                        {!game.isActive && (
                          <Badge variant="secondary" className="text-xs">
                            Inactive
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>Position #{index + 1}</span>
                        <span>•</span>
                        <span>{game.popularity}% popularity</span>
                        {index < 3 && (
                          <>
                            <span>•</span>
                            <Badge
                              className="text-xs bg-yellow-100 text-yellow-800"
                              variant="outline"
                            >
                              TOP 3
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Controls */}
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
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveToPosition(index, "top")}
                        disabled={index === 0}
                        className="text-xs px-2"
                      >
                        Top
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveToPosition(index, "bottom")}
                        disabled={index === games.length - 1}
                        className="text-xs px-2"
                      >
                        Bottom
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                How to Reorder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Drag & Drop
                  </h4>
                  <p>
                    Click and drag any game card to reorder it to your preferred
                    position.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Quick Controls
                  </h4>
                  <p>
                    Use arrow buttons for single steps or "Top/Bottom" for quick
                    positioning.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Priority Positions
                  </h4>
                  <p>
                    First 3 positions get special highlighting and appear
                    prominently on homepage.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Inactive Games
                  </h4>
                  <p>
                    Inactive games are shown in muted style but can still be
                    reordered.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
