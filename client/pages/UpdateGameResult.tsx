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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Trophy,
  Target,
  History,
  Save,
  RefreshCw,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ResultFormData {
  selectedGame: string;
  resultType: string;
  resultDate: string;
  openPatti: string;
  openAnk: string;
  closePatti: string;
  closeAnk: string;
}

interface ResultHistory {
  id: string;
  date: string;
  openPatti: string;
  openAnk: string;
  closePatti: string;
  closeAnk: string;
  status: "pending" | "published" | "cancelled";
}

export function UpdateGameResult() {
  const [formData, setFormData] = useState<ResultFormData>({
    selectedGame: "",
    resultType: "",
    resultDate: "",
    openPatti: "",
    openAnk: "",
    closePatti: "",
    closeAnk: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [resultHistory, setResultHistory] = useState<ResultHistory[]>([
    {
      id: "1",
      date: "2024-01-15",
      openPatti: "125",
      openAnk: "8",
      closePatti: "678",
      closeAnk: "3",
      status: "published",
    },
    {
      id: "2",
      date: "2024-01-14",
      openPatti: "456",
      openAnk: "6",
      closePatti: "789",
      closeAnk: "6",
      status: "published",
    },
    {
      id: "3",
      date: "2024-01-13",
      openPatti: "234",
      openAnk: "9",
      closePatti: "567",
      closeAnk: "8",
      status: "published",
    },
  ]);

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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.selectedGame) {
      newErrors.selectedGame = "Please select a game";
    }

    if (!formData.resultType) {
      newErrors.resultType = "Please select result type";
    }

    if (!formData.resultDate) {
      newErrors.resultDate = "Please select result date";
    }

    // Validate based on result type
    if (formData.resultType === "open" || formData.resultType === "both") {
      if (!formData.openPatti) {
        newErrors.openPatti = "Open Patti is required";
      } else if (!/^\\d{3}$/.test(formData.openPatti)) {
        newErrors.openPatti = "Open Patti must be exactly 3 digits";
      }

      if (!formData.openAnk) {
        newErrors.openAnk = "Open Ank is required";
      } else if (!/^\\d$/.test(formData.openAnk)) {
        newErrors.openAnk = "Open Ank must be a single digit";
      }
    }

    if (formData.resultType === "close" || formData.resultType === "both") {
      if (!formData.closePatti) {
        newErrors.closePatti = "Close Patti is required";
      } else if (!/^\\d{3}$/.test(formData.closePatti)) {
        newErrors.closePatti = "Close Patti must be exactly 3 digits";
      }

      if (!formData.closeAnk) {
        newErrors.closeAnk = "Close Ank is required";
      } else if (!/^\\d$/.test(formData.closeAnk)) {
        newErrors.closeAnk = "Close Ank must be a single digit";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateAnk = (patti: string): string => {
    if (patti.length !== 3) return "";
    const sum = patti
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit), 0);
    return (sum % 10).toString();
  };

  const handlePattiChange = (
    field: "openPatti" | "closePatti",
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Auto-calculate corresponding Ank
    if (value.length === 3 && /^\\d{3}$/.test(value)) {
      const ankField = field === "openPatti" ? "openAnk" : "closeAnk";
      const calculatedAnk = calculateAnk(value);
      setFormData((prev) => ({
        ...prev,
        [ankField]: calculatedAnk,
      }));
    }
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

      console.log("Result updated:", formData);
      setSubmitSuccess(true);

      // Add to history
      const newResult: ResultHistory = {
        id: Date.now().toString(),
        date: formData.resultDate,
        openPatti: formData.openPatti,
        openAnk: formData.openAnk,
        closePatti: formData.closePatti,
        closeAnk: formData.closeAnk,
        status: "published",
      };

      setResultHistory((prev) => [newResult, ...prev]);

      // Reset form after success
      setTimeout(() => {
        setFormData({
          selectedGame: "",
          resultType: "",
          resultDate: "",
          openPatti: "",
          openAnk: "",
          closePatti: "",
          closeAnk: "",
        });
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to update result:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderResultInputs = () => {
    if (formData.resultType === "open") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="openPatti">Open Patti</Label>
            <Input
              id="openPatti"
              value={formData.openPatti}
              onChange={(e) => handlePattiChange("openPatti", e.target.value)}
              placeholder="Enter 3-digit open patti"
              maxLength={3}
              className={errors.openPatti ? "border-red-500" : ""}
            />
            {errors.openPatti && (
              <p className="text-red-500 text-sm">{errors.openPatti}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="openAnk">
              Open Ank{" "}
              <span className="text-xs text-muted-foreground">
                (Auto-calculated)
              </span>
            </Label>
            <Input
              id="openAnk"
              value={formData.openAnk}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, openAnk: e.target.value }))
              }
              placeholder="Auto-calculated"
              maxLength={1}
              className={errors.openAnk ? "border-red-500" : ""}
            />
            {errors.openAnk && (
              <p className="text-red-500 text-sm">{errors.openAnk}</p>
            )}
          </div>
        </div>
      );
    }

    if (formData.resultType === "close") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="closePatti">Close Patti</Label>
            <Input
              id="closePatti"
              value={formData.closePatti}
              onChange={(e) => handlePattiChange("closePatti", e.target.value)}
              placeholder="Enter 3-digit close patti"
              maxLength={3}
              className={errors.closePatti ? "border-red-500" : ""}
            />
            {errors.closePatti && (
              <p className="text-red-500 text-sm">{errors.closePatti}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="closeAnk">
              Close Ank{" "}
              <span className="text-xs text-muted-foreground">
                (Auto-calculated)
              </span>
            </Label>
            <Input
              id="closeAnk"
              value={formData.closeAnk}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, closeAnk: e.target.value }))
              }
              placeholder="Auto-calculated"
              maxLength={1}
              className={errors.closeAnk ? "border-red-500" : ""}
            />
            {errors.closeAnk && (
              <p className="text-red-500 text-sm">{errors.closeAnk}</p>
            )}
          </div>
        </div>
      );
    }

    if (formData.resultType === "both") {
      return (
        <div className="space-y-6">
          <div>
            <h4 className="text-md font-semibold mb-3 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Open Result
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="openPatti">Open Patti</Label>
                <Input
                  id="openPatti"
                  value={formData.openPatti}
                  onChange={(e) =>
                    handlePattiChange("openPatti", e.target.value)
                  }
                  placeholder="Enter 3-digit open patti"
                  maxLength={3}
                  className={errors.openPatti ? "border-red-500" : ""}
                />
                {errors.openPatti && (
                  <p className="text-red-500 text-sm">{errors.openPatti}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="openAnk">
                  Open Ank{" "}
                  <span className="text-xs text-muted-foreground">
                    (Auto-calculated)
                  </span>
                </Label>
                <Input
                  id="openAnk"
                  value={formData.openAnk}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      openAnk: e.target.value,
                    }))
                  }
                  placeholder="Auto-calculated"
                  maxLength={1}
                  className={errors.openAnk ? "border-red-500" : ""}
                />
                {errors.openAnk && (
                  <p className="text-red-500 text-sm">{errors.openAnk}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-3 flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Close Result
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="closePatti">Close Patti</Label>
                <Input
                  id="closePatti"
                  value={formData.closePatti}
                  onChange={(e) =>
                    handlePattiChange("closePatti", e.target.value)
                  }
                  placeholder="Enter 3-digit close patti"
                  maxLength={3}
                  className={errors.closePatti ? "border-red-500" : ""}
                />
                {errors.closePatti && (
                  <p className="text-red-500 text-sm">{errors.closePatti}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="closeAnk">
                  Close Ank{" "}
                  <span className="text-xs text-muted-foreground">
                    (Auto-calculated)
                  </span>
                </Label>
                <Input
                  id="closeAnk"
                  value={formData.closeAnk}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      closeAnk: e.target.value,
                    }))
                  }
                  placeholder="Auto-calculated"
                  maxLength={1}
                  className={errors.closeAnk ? "border-red-500" : ""}
                />
                {errors.closeAnk && (
                  <p className="text-red-500 text-sm">{errors.closeAnk}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-gradient-light min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            📊 Update Game Result
          </h1>
          <p className="text-muted-foreground">
            Update results for existing games
          </p>
        </div>

        {submitSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Result updated successfully! The form will reset automatically.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div>
            <Card className="shadow-soft border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  🎯 Result Entry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Game Selection */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Basic Information
                    </h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="selectedGame">Select Game</Label>
                        <Select
                          value={formData.selectedGame}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              selectedGame: value,
                            }))
                          }
                        >
                          <SelectTrigger
                            className={
                              errors.selectedGame ? "border-red-500" : ""
                            }
                          >
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
                        {errors.selectedGame && (
                          <p className="text-red-500 text-sm">
                            {errors.selectedGame}
                          </p>
                        )}
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
                          max={new Date().toISOString().split("T")[0]}
                          className={errors.resultDate ? "border-red-500" : ""}
                        />
                        {errors.resultDate && (
                          <p className="text-red-500 text-sm">
                            {errors.resultDate}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Result Type */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Result Type</h3>
                    <RadioGroup
                      value={formData.resultType}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, resultType: value }))
                      }
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="open" id="open" />
                        <Label
                          htmlFor="open"
                          className="flex items-center gap-2"
                        >
                          <Target className="w-4 h-4" />
                          Open Result Only
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="close" id="close" />
                        <Label
                          htmlFor="close"
                          className="flex items-center gap-2"
                        >
                          <Trophy className="w-4 h-4" />
                          Close Result Only
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="both" id="both" />
                        <Label
                          htmlFor="both"
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Both Results
                        </Label>
                      </div>
                    </RadioGroup>
                    {errors.resultType && (
                      <p className="text-red-500 text-sm">
                        {errors.resultType}
                      </p>
                    )}
                  </div>

                  <Separator />

                  {/* Result Input */}
                  {formData.resultType && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Result Details</h3>
                      {renderResultInputs()}
                    </div>
                  )}

                  {/* Submit Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-lg min-w-[120px]"
                    >
                      💾 {isSubmitting ? "Updating..." : "Update Result"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setFormData({
                          selectedGame: "",
                          resultType: "",
                          resultDate: "",
                          openPatti: "",
                          openAnk: "",
                          closePatti: "",
                          closeAnk: "",
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

          {/* Result History Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Recent Results
                  {formData.selectedGame && (
                    <Badge variant="secondary" className="ml-2">
                      {formData.selectedGame}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {resultHistory.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Open</TableHead>
                        <TableHead>Close</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {resultHistory.slice(0, 10).map((result) => (
                        <TableRow key={result.id}>
                          <TableCell className="font-medium">
                            {new Date(result.date).toLocaleDateString("en-IN")}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm">
                                <span className="font-mono">
                                  {result.openPatti}
                                </span>
                                {result.openAnk && (
                                  <span className="text-muted-foreground ml-1">
                                    ({result.openAnk})
                                  </span>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm">
                                <span className="font-mono">
                                  {result.closePatti}
                                </span>
                                {result.closeAnk && (
                                  <span className="text-muted-foreground ml-1">
                                    ({result.closeAnk})
                                  </span>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`text-xs ${getStatusColor(
                                result.status,
                              )}`}
                            >
                              {result.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No result history available</p>
                    <p className="text-sm">
                      Results will appear here after you update them
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Help Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Help & Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground">Patti Format:</p>
                  <p>
                    Patti must be exactly 3 digits (e.g., 125, 456, 789). The
                    corresponding Ank will be auto-calculated.
                  </p>
                </div>

                <div>
                  <p className="font-medium text-foreground">
                    Ank Calculation:
                  </p>
                  <p>
                    Ank is the last digit of the sum of all digits in Patti.
                    Example: 125 → 1+2+5=8 → Ank is 8.
                  </p>
                </div>

                <div>
                  <p className="font-medium text-foreground">Result Types:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Open Only: Just the opening result</li>
                    <li>Close Only: Just the closing result</li>
                    <li>Both: Complete open and close results</li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium text-foreground">Best Practices:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Double-check all numbers before submitting</li>
                    <li>Results cannot be edited once published</li>
                    <li>Select the correct date for historical results</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
