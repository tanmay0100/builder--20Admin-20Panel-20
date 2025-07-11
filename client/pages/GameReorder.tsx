import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GripVertical, Crown, TrendingUp, Star, Gamepad2 } from "lucide-react";

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

  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const getGameColor = (index: number) => {
    const colors = [
      "from-purple-100 to-pink-100 border-purple-200",
      "from-blue-100 to-cyan-100 border-blue-200",
      "from-green-100 to-emerald-100 border-green-200",
      "from-orange-100 to-red-100 border-orange-200",
      "from-indigo-100 to-purple-100 border-indigo-200",
      "from-pink-100 to-rose-100 border-pink-200",
      "from-teal-100 to-green-100 border-teal-200",
      "from-yellow-100 to-orange-100 border-yellow-200",
      "from-red-100 to-pink-100 border-red-200",
      "from-cyan-100 to-blue-100 border-cyan-200",
      "from-emerald-100 to-teal-100 border-emerald-200",
    ];
    return colors[index % colors.length];
  };

  const getGameIcon = (index: number) => {
    const icons = [Crown, Star, TrendingUp, Gamepad2];
    const IconComponent = icons[index % icons.length];
    const iconColors = [
      "text-purple-600",
      "text-blue-600",
      "text-green-600",
      "text-orange-600",
      "text-indigo-600",
      "text-pink-600",
      "text-teal-600",
      "text-yellow-600",
      "text-red-600",
      "text-cyan-600",
      "text-emerald-600",
    ];
    return (
      <IconComponent
        className={`w-4 h-4 ${iconColors[index % iconColors.length]}`}
      />
    );
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
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const moveToTop = (index: number) => {
    const newGames = [...games];
    const game = newGames.splice(index, 1)[0];
    newGames.unshift(game);
    setGames(newGames);
  };

  const moveToBottom = (index: number) => {
    const newGames = [...games];
    const game = newGames.splice(index, 1)[0];
    newGames.push(game);
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
    <div className="p-6 bg-gradient-light min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Game Reorder
        </h1>
        <p className="text-muted-foreground">
          Drag and drop or use quick controls to reorder games as they appear on
          the homepage
        </p>
      </div>

      <Card className="max-w-3xl shadow-soft border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-blue text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="w-6 h-6" />
            Game Order Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {games.map((game, index) => (
              <div
                key={game}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`group relative flex items-center gap-4 p-4 rounded-xl border-2 border-transparent transition-all duration-200 cursor-move ${
                  draggedItem === index
                    ? "opacity-50 scale-95"
                    : "hover:border-primary/20 hover:shadow-lg hover:scale-[1.02]"
                } bg-gradient-to-r ${getGameColor(index)} text-white shadow-md hover:shadow-xl`}
              >
                <div className="flex items-center gap-3">
                  <GripVertical className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    {getGameIcon(index)}
                  </div>
                </div>

                <div className="flex-1">
                  <span className="font-semibold text-lg">{game}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
                      Position #{index + 1}
                    </span>
                    {index < 3 && (
                      <span className="text-xs bg-yellow-400/90 text-yellow-900 px-2 py-1 rounded-full font-medium">
                        TOP 3
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => moveToTop(index)}
                    disabled={index === 0}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    Move to Top
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => moveToBottom(index)}
                    disabled={index === games.length - 1}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    Move to Bottom
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-6 py-2 shadow-lg"
            >
              💾 Save Order
            </Button>
            <Button
              onClick={resetOrder}
              variant="outline"
              className="border-2 border-orange-300 text-orange-600 hover:bg-orange-50 font-semibold px-6 py-2"
            >
              🔄 Reset to Default
            </Button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">💡</span>
              </div>
              <div>
                <p className="font-medium text-blue-900 text-sm">
                  How to reorder:
                </p>
                <ul className="text-sm text-blue-700 mt-1 space-y-1">
                  <li>
                    • <strong>Drag & Drop:</strong> Click and drag any game card
                    to reorder
                  </li>
                  <li>
                    • <strong>Quick Controls:</strong> Use "Move to Top" or
                    "Move to Bottom" buttons
                  </li>
                  <li>
                    • <strong>Top 3 Priority:</strong> First 3 positions get
                    special highlighting
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
