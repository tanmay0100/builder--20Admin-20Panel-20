import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function UpdateGameResult() {
  const [formData, setFormData] = useState({
    selectedGame: "",
    resultType: "",
    resultDate: "",
    openPatti: "",
    openAnk: "",
    closePatti: "",
    closeAnk: "",
  });

  const gameOptions = [
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Result updated:", formData);
    // Add API call here
  };

  const renderResultInputs = () => {
    if (formData.resultType === "open") {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="openPatti">Open Patti</Label>
            <Input
              id="openPatti"
              value={formData.openPatti}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, openPatti: e.target.value }))
              }
              placeholder="Enter open patti"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="openAnk">Open Ank</Label>
            <Input
              id="openAnk"
              value={formData.openAnk}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, openAnk: e.target.value }))
              }
              placeholder="Enter open ank"
            />
          </div>
        </div>
      );
    }

    if (formData.resultType === "close") {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="closePatti">Close Patti</Label>
            <Input
              id="closePatti"
              value={formData.closePatti}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, closePatti: e.target.value }))
              }
              placeholder="Enter close patti"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="closeAnk">Close Ank</Label>
            <Input
              id="closeAnk"
              value={formData.closeAnk}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, closeAnk: e.target.value }))
              }
              placeholder="Enter close ank"
            />
          </div>
        </div>
      );
    }

    if (formData.resultType === "both") {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="openPatti">Open Patti</Label>
              <Input
                id="openPatti"
                value={formData.openPatti}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    openPatti: e.target.value,
                  }))
                }
                placeholder="Enter open patti"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="openAnk">Open Ank</Label>
              <Input
                id="openAnk"
                value={formData.openAnk}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, openAnk: e.target.value }))
                }
                placeholder="Enter open ank"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="closePatti">Close Patti</Label>
              <Input
                id="closePatti"
                value={formData.closePatti}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    closePatti: e.target.value,
                  }))
                }
                placeholder="Enter close patti"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="closeAnk">Close Ank</Label>
              <Input
                id="closeAnk"
                value={formData.closeAnk}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, closeAnk: e.target.value }))
                }
                placeholder="Enter close ank"
              />
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="p-6 bg-gradient-light min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          📊 Update Game Result
        </h1>
        <p className="text-muted-foreground">
          Update results for existing games
        </p>
      </div>

      <Card className="max-w-2xl shadow-soft border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            🎯 Result Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="selectedGame">Select Game</Label>
              <Select
                value={formData.selectedGame}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, selectedGame: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a game" />
                </SelectTrigger>
                <SelectContent>
                  {gameOptions.map((game) => (
                    <SelectItem key={game} value={game}>
                      {game}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Result Type</Label>
              <RadioGroup
                value={formData.resultType}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, resultType: value }))
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="open" id="open" />
                  <Label htmlFor="open">Open Result</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="close" id="close" />
                  <Label htmlFor="close">Close Result</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="both" />
                  <Label htmlFor="both">Open and Close Both</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resultDate">Result Date</Label>
              <Input
                id="resultDate"
                type="date"
                value={formData.resultDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    resultDate: e.target.value,
                  }))
                }
              />
            </div>

            {formData.resultType && (
              <div className="space-y-4">
                <Label>Result Feed Input</Label>
                {renderResultInputs()}
              </div>
            )}

            <div className="flex gap-4">
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Update Result
              </Button>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
