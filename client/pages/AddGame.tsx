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
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Clock,
  Star,
  AlertCircle,
  CheckCircle,
  Gamepad2,
  Settings,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface GameFormData {
  gameName: string;
  customName: string;
  startTime: string;
  endTime: string;
  featured: boolean;
  active: boolean;
  frequency: string;
}

export function AddGame() {
  const [formData, setFormData] = useState<GameFormData>({
    gameName: "",
    customName: "",
    startTime: "",
    endTime: "",
    featured: false,
    active: true,
    frequency: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const gameTemplates = [
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
    "CUSTOM",
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.gameName) {
      newErrors.gameName = "Game selection is required";
    }

    if (formData.gameName === "CUSTOM" && !formData.customName.trim()) {
      newErrors.customName = "Custom game name is required";
    }

    if (!formData.startTime) {
      newErrors.startTime = "Start time is required";
    }

    if (!formData.endTime) {
      newErrors.endTime = "End time is required";
    }

    if (
      formData.startTime &&
      formData.endTime &&
      formData.startTime >= formData.endTime
    ) {
      newErrors.endTime = "End time must be after start time";
    }

    if (!formData.frequency) {
      newErrors.frequency = "Game frequency is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Game created:", formData);
      setSubmitSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setFormData({
          gameName: "",
          customName: "",
          startTime: "",
          endTime: "",
          featured: false,
          active: true,
          frequency: "",
        });
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to create game:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-light min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
            ➕ Add New Game
          </h1>
          <p className="text-muted-foreground">
            Create a new game for the platform
          </p>
        </div>

        {submitSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Game created successfully! The form will reset automatically.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-soft border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  🎮 Game Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Basic Information
                    </h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="gameName">Game Template</Label>
                        <Select
                          value={formData.gameName}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              gameName: value,
                            }))
                          }
                        >
                          <SelectTrigger
                            className={errors.gameName ? "border-red-500" : ""}
                          >
                            <SelectValue placeholder="Choose a game template" />
                          </SelectTrigger>
                          <SelectContent>
                            {gameTemplates.map((game) => (
                              <SelectItem key={game} value={game}>
                                {game}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.gameName && (
                          <p className="text-red-500 text-sm">
                            {errors.gameName}
                          </p>
                        )}
                      </div>

                      {formData.gameName === "CUSTOM" && (
                        <div className="space-y-2">
                          <Label htmlFor="customName">Custom Game Name</Label>
                          <Input
                            id="customName"
                            value={formData.customName}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                customName: e.target.value,
                              }))
                            }
                            placeholder="Enter custom game name"
                            className={
                              errors.customName ? "border-red-500" : ""
                            }
                          />
                          {errors.customName && (
                            <p className="text-red-500 text-sm">
                              {errors.customName}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Timing */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Game Timing
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startTime">Start Time</Label>
                        <Input
                          id="startTime"
                          type="time"
                          value={formData.startTime}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              startTime: e.target.value,
                            }))
                          }
                          className={errors.startTime ? "border-red-500" : ""}
                        />
                        {errors.startTime && (
                          <p className="text-red-500 text-sm">
                            {errors.startTime}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="endTime">End Time</Label>
                        <Input
                          id="endTime"
                          type="time"
                          value={formData.endTime}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              endTime: e.target.value,
                            }))
                          }
                          className={errors.endTime ? "border-red-500" : ""}
                        />
                        {errors.endTime && (
                          <p className="text-red-500 text-sm">
                            {errors.endTime}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="frequency">Frequency</Label>
                        <Select
                          value={formData.frequency}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              frequency: value,
                            }))
                          }
                        >
                          <SelectTrigger
                            className={errors.frequency ? "border-red-500" : ""}
                          >
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="special">
                              Special Events
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.frequency && (
                          <p className="text-red-500 text-sm">
                            {errors.frequency}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Game Options */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Game Options</h3>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="featured"
                          checked={formData.featured}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              featured: !!checked,
                            }))
                          }
                        />
                        <Label
                          htmlFor="featured"
                          className="flex items-center gap-1"
                        >
                          <Star className="w-4 h-4" />
                          Featured Game
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="active"
                          checked={formData.active}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              active: !!checked,
                            }))
                          }
                        />
                        <Label htmlFor="active">Active Game</Label>
                      </div>
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-lg min-w-[120px]"
                    >
                      ✅ {isSubmitting ? "Creating..." : "Create Game"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setFormData({
                          gameName: "",
                          customName: "",
                          startTime: "",
                          endTime: "",
                          featured: false,
                          active: true,
                          frequency: "",
                        });
                        setErrors({});
                      }}
                      className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold"
                    >
                      ❌ Reset Form
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">Game Name:</Label>
                  <p className="text-sm text-muted-foreground">
                    {formData.gameName === "CUSTOM"
                      ? formData.customName || "Custom Game"
                      : formData.gameName || "No game selected"}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Timing:</Label>
                  <p className="text-sm text-muted-foreground">
                    {formData.startTime && formData.endTime
                      ? `${formData.startTime} - ${formData.endTime}`
                      : "No timing set"}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Frequency:</Label>
                  <p className="text-sm text-muted-foreground">
                    {formData.frequency || "No frequency selected"}
                  </p>
                </div>

                <div className="flex gap-2 mt-3">
                  {formData.featured && (
                    <Badge className="text-xs bg-yellow-100 text-yellow-800">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  {formData.active && (
                    <Badge className="text-xs bg-green-100 text-green-800">
                      Active
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Help */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Help
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <p className="font-medium">Game Templates:</p>
                  <p>Choose from predefined games or create a custom one.</p>
                </div>

                <div>
                  <p className="font-medium">Featured Games:</p>
                  <p>Featured games appear prominently on the homepage.</p>
                </div>

                <div>
                  <p className="font-medium">Frequency:</p>
                  <p>
                    How often this game runs - daily, weekly, or special events.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
