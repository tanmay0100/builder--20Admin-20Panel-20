import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Star,
  TrendingUp,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
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

interface LuckyNumber {
  id: string;
  number: string;
  addedDate: string;
  status: "active" | "inactive";
  hitCount: number;
}

export function AddLuckyNumber() {
  const [newNumber, setNewNumber] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [luckyNumbers, setLuckyNumbers] = useState<LuckyNumber[]>([
    {
      id: "1",
      number: "777",
      addedDate: "2024-01-15",
      status: "active",
      hitCount: 45,
    },
    {
      id: "2",
      number: "123",
      addedDate: "2024-01-14",
      status: "active",
      hitCount: 32,
    },
    {
      id: "3",
      number: "555",
      addedDate: "2024-01-13",
      status: "active",
      hitCount: 28,
    },
    {
      id: "4",
      number: "999",
      addedDate: "2024-01-12",
      status: "inactive",
      hitCount: 15,
    },
    {
      id: "5",
      number: "888",
      addedDate: "2024-01-11",
      status: "active",
      hitCount: 67,
    },
  ]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!newNumber.trim()) {
      newErrors.number = "Lucky number is required";
    } else if (!/^\\d{1,4}$/.test(newNumber.trim())) {
      newErrors.number = "Lucky number must be 1-4 digits only";
    } else if (luckyNumbers.some((ln) => ln.number === newNumber.trim())) {
      newErrors.number = "This lucky number already exists";
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newLuckyNumber: LuckyNumber = {
        id: Date.now().toString(),
        number: newNumber.trim(),
        addedDate: new Date().toISOString().split("T")[0],
        status: "active",
        hitCount: 0,
      };

      setLuckyNumbers((prev) => [newLuckyNumber, ...prev]);
      setNewNumber("");
      setSubmitSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);

      console.log("Lucky number added:", newLuckyNumber);
    } catch (error) {
      console.error("Failed to add lucky number:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id: string) => {
    setLuckyNumbers((prev) => prev.filter((ln) => ln.id !== id));
  };

  const toggleStatus = (id: string) => {
    setLuckyNumbers((prev) =>
      prev.map((ln) =>
        ln.id === id
          ? { ...ln, status: ln.status === "active" ? "inactive" : "active" }
          : ln,
      ),
    );
  };

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <div className="p-6 bg-gradient-light min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
            ✨ Lucky Numbers Management
          </h1>
          <p className="text-muted-foreground">
            Add and manage lucky numbers for the platform
          </p>
        </div>

        {submitSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Lucky number added successfully!
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add New Lucky Number */}
          <div>
            <Card className="shadow-soft border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  ➕ Add New Lucky Number
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="luckyNumber">Lucky Number</Label>
                    <Input
                      id="luckyNumber"
                      type="text"
                      value={newNumber}
                      onChange={(e) => setNewNumber(e.target.value)}
                      placeholder="Enter lucky number (e.g., 777, 123)"
                      maxLength={4}
                      className={errors.number ? "border-red-500" : ""}
                    />
                    {errors.number && (
                      <p className="text-red-500 text-sm">{errors.number}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Enter 1-4 digit numbers only
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold shadow-lg"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {isSubmitting ? "Adding..." : "Add Lucky Number"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setNewNumber("");
                        setErrors({});
                      }}
                      className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold"
                    >
                      Clear
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Numbers:
                  </span>
                  <Badge variant="secondary">{luckyNumbers.length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Active Numbers:
                  </span>
                  <Badge className="bg-green-100 text-green-800">
                    {luckyNumbers.filter((ln) => ln.status === "active").length}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Most Popular:
                  </span>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    {luckyNumbers.length > 0
                      ? luckyNumbers.reduce((max, ln) =>
                          ln.hitCount > max.hitCount ? ln : max,
                        ).number
                      : "None"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Current Lucky Numbers */}
          <div>
            <Card className="shadow-soft border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  🎯 Current Lucky Numbers ({luckyNumbers.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {luckyNumbers.length === 0 ? (
                  <div className="text-center py-8">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                    <p className="text-muted-foreground">
                      No lucky numbers added yet
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Add your first lucky number using the form
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {luckyNumbers.map((luckyNumber) => (
                      <div
                        key={luckyNumber.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:shadow-sm transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-sm">
                            <span className="text-white font-bold text-lg">
                              {luckyNumber.number}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-foreground">
                                {luckyNumber.number}
                              </span>
                              <Badge
                                className={`text-xs ${getStatusColor(
                                  luckyNumber.status,
                                )}`}
                              >
                                {luckyNumber.status}
                              </Badge>
                              {luckyNumber.hitCount > 50 && (
                                <Badge className="text-xs bg-yellow-100 text-yellow-800">
                                  <Star className="w-3 h-3 mr-1" />
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Added:{" "}
                              {new Date(
                                luckyNumber.addedDate,
                              ).toLocaleDateString("en-IN")}
                              {" • "}
                              Hits: {luckyNumber.hitCount}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleStatus(luckyNumber.id)}
                            className="text-xs"
                          >
                            {luckyNumber.status === "active"
                              ? "Deactivate"
                              : "Activate"}
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="destructive">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Lucky Number?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete the lucky
                                  number "{luckyNumber.number}"? This action
                                  cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(luckyNumber.id)}
                                  className="bg-destructive hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Help Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground">Number Format:</p>
                  <p>Enter 1-4 digit numbers only (e.g., 7, 77, 777, 7777)</p>
                </div>

                <div>
                  <p className="font-medium text-foreground">Status:</p>
                  <p>
                    Active numbers are visible to users. Inactive numbers are
                    hidden.
                  </p>
                </div>

                <div>
                  <p className="font-medium text-foreground">Hit Count:</p>
                  <p>
                    Shows how many times users have selected this lucky number.
                  </p>
                </div>

                <div>
                  <p className="font-medium text-foreground">
                    Popular Numbers:
                  </p>
                  <p>Numbers with 50+ hits get a special "Popular" badge.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
