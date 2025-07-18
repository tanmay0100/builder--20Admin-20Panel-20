import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  ArrowLeft,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  Palette,
  Target,
  Coins,
  Calculator,
  RefreshCw,
  Play,
  Info,
  Crown,
  Sparkles,
  Wallet,
  User,
  Menu,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type GameType = "selection" | "matka" | "colorking" | "dicegame";
type BettingType =
  | "single_patti"
  | "jodi_digit"
  | "single_panna"
  | "double_panna"
  | "triple_panna"
  | "half_sangam"
  | "full_sangam";

interface BetData {
  type: BettingType | null;
  numbers: string[];
  betAmount: number;
  customAmount: string;
  rate: number;
  potentialWinnings: number;
}

export default function PlayGames() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [currentGame, setCurrentGame] = useState<GameType>("selection");
  const [selectedBettingType, setSelectedBettingType] =
    useState<BettingType | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [diceResult, setDiceResult] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [showBetDialog, setShowBetDialog] = useState(false);

  const [betData, setBetData] = useState<BetData>({
    type: null,
    numbers: [],
    betAmount: 0,
    customAmount: "",
    rate: 0,
    potentialWinnings: 0,
  });

  const walletBalance = 2500;

  const bettingTypes = [
    {
      id: "single_patti",
      name: "Single Patti",
      rate: 9.5,
      description: "Single digit 0-9",
    },
    {
      id: "jodi_digit",
      name: "Jodi Digit",
      rate: 95,
      description: "Two digit 00-99",
    },
    {
      id: "single_panna",
      name: "Single Panna",
      rate: 140,
      description: "Three digit combination",
    },
    {
      id: "double_panna",
      name: "Double Panna",
      rate: 280,
      description: "Two same digits + one different",
    },
    {
      id: "triple_panna",
      name: "Triple Panna",
      rate: 950,
      description: "Three same digits",
    },
    {
      id: "half_sangam",
      name: "Half Sangam",
      rate: 1425,
      description: "Open Ank + Close Patti",
    },
    {
      id: "full_sangam",
      name: "Full Sangam",
      rate: 9500,
      description: "Open Patti + Close Patti",
    },
  ];

  const coinOptions = [10, 20, 50, 100, 500, 1000];

  const colors = [
    { name: "Red", value: "#ef4444", multiplier: 2 },
    { name: "Green", value: "#22c55e", multiplier: 2 },
    { name: "Blue", value: "#3b82f6", multiplier: 2 },
    { name: "Yellow", value: "#eab308", multiplier: 3 },
    { name: "Purple", value: "#a855f7", multiplier: 3 },
    { name: "Orange", value: "#f97316", multiplier: 4 },
  ];

  const triplePannaMapping = {
    0: "000",
    1: "111",
    2: "222",
    3: "333",
    4: "444",
    5: "555",
    6: "666",
    7: "777",
    8: "888",
    9: "999",
  };

  const menuItems = [
    { icon: User, label: "Dashboard", href: "/user/dashboard" },
    { icon: Target, label: "My Bids", href: "/user/bids" },
    { icon: Wallet, label: "My Wallet", href: "/user/wallet" },
  ];

  const calculateWinnings = (amount: number, rate: number) => {
    return amount * rate;
  };

  const updateBetData = (updates: Partial<BetData>) => {
    setBetData((prev) => {
      const updated = { ...prev, ...updates };
      if (updated.betAmount && updated.rate) {
        updated.potentialWinnings = calculateWinnings(
          updated.betAmount,
          updated.rate,
        );
      }
      return updated;
    });
  };

  const handleNumberSelect = (number: string) => {
    if (selectedBettingType === "single_patti" && betData.numbers.length >= 1) {
      updateBetData({ numbers: [number] });
    } else if (
      selectedBettingType === "jodi_digit" &&
      betData.numbers.length >= 1
    ) {
      updateBetData({ numbers: [number] });
    } else if (
      selectedBettingType?.includes("panna") &&
      betData.numbers.length >= 1
    ) {
      updateBetData({ numbers: [number] });
    } else {
      updateBetData({ numbers: [...betData.numbers, number] });
    }
  };

  const handleBettingTypeSelect = (type: BettingType) => {
    const selectedType = bettingTypes.find((bt) => bt.id === type);
    setSelectedBettingType(type);
    updateBetData({
      type,
      numbers: [],
      rate: selectedType?.rate || 0,
      betAmount: 0,
      potentialWinnings: 0,
    });
  };

  const handleCoinSelect = (amount: number) => {
    updateBetData({ betAmount: amount, customAmount: "" });
  };

  const handleCustomAmountChange = (value: string) => {
    const amount = parseInt(value) || 0;
    updateBetData({ customAmount: value, betAmount: amount });
  };

  const resetBet = () => {
    setBetData({
      type: null,
      numbers: [],
      betAmount: 0,
      customAmount: "",
      rate: 0,
      potentialWinnings: 0,
    });
    setSelectedBettingType(null);
  };

  const placeBet = () => {
    if (!betData.type || betData.numbers.length === 0 || !betData.betAmount) {
      toast.error("Please complete your bet selection");
      return;
    }

    if (betData.betAmount > walletBalance) {
      toast.error("Insufficient wallet balance");
      return;
    }

    setShowBetDialog(true);
  };

  const confirmBet = () => {
    toast.success(
      `Bet placed successfully! Potential winnings: ₹${betData.potentialWinnings}`,
    );
    setShowBetDialog(false);
    resetBet();
  };

  const rollDice = () => {
    setIsRolling(true);
    setTimeout(() => {
      const result = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ];
      setDiceResult(result);
      setIsRolling(false);
    }, 1000);
  };

  const renderGameSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Select Your Game</h1>
        <p className="text-white/80">
          Choose from our exciting game collection
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
        {/* Matka Game */}
        <Card
          className="relative overflow-hidden cursor-pointer group hover:scale-105 transition-all duration-500 bg-gradient-to-br from-red-500/80 to-orange-600/80 border border-white/20 shadow-2xl backdrop-blur-md"
          onClick={() => setCurrentGame("matka")}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20"></div>
          <CardContent className="relative p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Dice1 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Matka</h3>
            <p className="text-white/80 mb-4">
              Traditional number betting game
            </p>
            <Button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30 text-white font-bold">
              Play Now
            </Button>
          </CardContent>
        </Card>

        {/* Color King */}
        <Card
          className="relative overflow-hidden cursor-pointer group hover:scale-105 transition-all duration-500 bg-gradient-to-br from-purple-500/80 to-pink-600/80 border border-white/20 shadow-2xl backdrop-blur-md"
          onClick={() => setCurrentGame("colorking")}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20"></div>
          <CardContent className="relative p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Color King</h3>
            <p className="text-white/80 mb-4">Bet on your favorite colors</p>
            <Button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30 text-white font-bold">
              Play Now
            </Button>
          </CardContent>
        </Card>

        {/* Dice Game */}
        <Card
          className="relative overflow-hidden cursor-pointer group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-blue-500 to-cyan-600 border-0 shadow-2xl"
          onClick={() => setCurrentGame("dicegame")}
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <CardContent className="relative p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Dice6 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Dice Game</h3>
            <p className="text-white/80 mb-4">Roll the dice and win big</p>
            <Button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30 text-white font-bold">
              Play Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderMatkaGame = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => setCurrentGame("selection")}
          className="text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Games
        </Button>
        <h1 className="text-3xl font-bold text-white">Matka Game</h1>
      </div>

      {!selectedBettingType ? (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white text-center">
            Select Betting Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bettingTypes.map((type) => (
              <Card
                key={type.id}
                className="relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 bg-gradient-to-br from-red-500 to-orange-600 border-0 shadow-xl"
                onClick={() => handleBettingTypeSelect(type.id as BettingType)}
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <CardContent className="relative p-6 text-center">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {type.name}
                  </h3>
                  <Badge className="bg-white/20 text-white mb-2">
                    {type.rate}x Rate
                  </Badge>
                  <p className="text-white/80 text-sm">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Betting Interface */}
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              onClick={() => setSelectedBettingType(null)}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h2 className="text-2xl font-bold text-white">
              {bettingTypes.find((t) => t.id === selectedBettingType)?.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Number Selection */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Select Numbers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedBettingType === "single_patti" && (
                  <div className="grid grid-cols-5 gap-2">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <Button
                        key={num}
                        variant={
                          betData.numbers.includes(num.toString())
                            ? "default"
                            : "outline"
                        }
                        className="aspect-square"
                        onClick={() => handleNumberSelect(num.toString())}
                      >
                        {num}
                      </Button>
                    ))}
                  </div>
                )}

                {selectedBettingType === "jodi_digit" && (
                  <div className="space-y-4">
                    <Input
                      placeholder="Enter two digits (00-99)"
                      maxLength={2}
                      value={betData.numbers[0] || ""}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 2) {
                          updateBetData({ numbers: [value] });
                        }
                      }}
                      className="text-center text-xl font-bold"
                    />
                  </div>
                )}

                {selectedBettingType === "triple_panna" && (
                  <div className="space-y-4">
                    <p className="text-white/80 text-sm">
                      Select digit (will convert to triple)
                    </p>
                    <div className="grid grid-cols-5 gap-2">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <Button
                          key={num}
                          variant={
                            betData.numbers.includes(
                              triplePannaMapping[
                                num as keyof typeof triplePannaMapping
                              ],
                            )
                              ? "default"
                              : "outline"
                          }
                          className="aspect-square"
                          onClick={() =>
                            handleNumberSelect(
                              triplePannaMapping[
                                num as keyof typeof triplePannaMapping
                              ],
                            )
                          }
                        >
                          {num} →{" "}
                          {
                            triplePannaMapping[
                              num as keyof typeof triplePannaMapping
                            ]
                          }
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedBettingType?.includes("panna") &&
                  !selectedBettingType.includes("triple") && (
                    <div className="space-y-4">
                      <Input
                        placeholder="Enter three digits (e.g., 123)"
                        maxLength={3}
                        value={betData.numbers[0] || ""}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          if (value.length <= 3) {
                            updateBetData({ numbers: [value] });
                          }
                        }}
                        className="text-center text-xl font-bold"
                      />
                    </div>
                  )}

                {selectedBettingType === "half_sangam" && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white">Open Ank (0-9)</Label>
                      <Input
                        placeholder="Enter single digit"
                        maxLength={1}
                        className="text-center"
                      />
                    </div>
                    <div>
                      <Label className="text-white">
                        Close Patti (3 digits)
                      </Label>
                      <Input
                        placeholder="Enter three digits"
                        maxLength={3}
                        className="text-center"
                      />
                    </div>
                  </div>
                )}

                {selectedBettingType === "full_sangam" && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white">
                        Open Patti (3 digits)
                      </Label>
                      <Input
                        placeholder="Enter three digits"
                        maxLength={3}
                        className="text-center"
                      />
                    </div>
                    <div>
                      <Label className="text-white">
                        Close Patti (3 digits)
                      </Label>
                      <Input
                        placeholder="Enter three digits"
                        maxLength={3}
                        className="text-center"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Bet Amount & Summary */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Bet Amount</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Coin Selection */}
                <div className="grid grid-cols-3 gap-2">
                  {coinOptions.map((coin) => (
                    <Button
                      key={coin}
                      variant={
                        betData.betAmount === coin ? "default" : "outline"
                      }
                      className="aspect-square rounded-full"
                      onClick={() => handleCoinSelect(coin)}
                    >
                      ₹{coin}
                    </Button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div>
                  <Label className="text-white">Custom Amount</Label>
                  <Input
                    placeholder="Enter custom amount"
                    value={betData.customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="text-center"
                  />
                </div>

                {/* Bet Summary */}
                <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                  <h4 className="text-white font-bold mb-2">Bet Summary</h4>
                  <div className="space-y-2 text-white/80">
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span>
                        {
                          bettingTypes.find((t) => t.id === selectedBettingType)
                            ?.name
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Numbers:</span>
                      <span>{betData.numbers.join(", ") || "None"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bet Amount:</span>
                      <span>₹{betData.betAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rate:</span>
                      <span>{betData.rate}x</span>
                    </div>
                    <div className="flex justify-between font-bold text-white">
                      <span>Potential Winnings:</span>
                      <span>₹{betData.potentialWinnings}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={resetBet}
                    variant="outline"
                    className="flex-1"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  <Button
                    onClick={placeBet}
                    disabled={
                      !betData.type ||
                      betData.numbers.length === 0 ||
                      !betData.betAmount
                    }
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Place Bet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );

  const renderColorKing = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => setCurrentGame("selection")}
          className="text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Games
        </Button>
        <h1 className="text-3xl font-bold text-white">Color King</h1>
      </div>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Select Your Color</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {colors.map((color) => (
              <Card
                key={color.name}
                className={cn(
                  "cursor-pointer transition-all duration-300 hover:scale-105",
                  selectedColor === color.value
                    ? "ring-4 ring-white"
                    : "hover:ring-2 hover:ring-white/50",
                )}
                style={{ backgroundColor: color.value }}
                onClick={() => setSelectedColor(color.value)}
              >
                <CardContent className="p-6 text-center">
                  <Crown className="w-8 h-8 text-white mx-auto mb-2" />
                  <h3 className="text-white font-bold">{color.name}</h3>
                  <Badge className="bg-white/20 text-white mt-2">
                    {color.multiplier}x
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDiceGame = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => setCurrentGame("selection")}
          className="text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Games
        </Button>
        <h1 className="text-3xl font-bold text-white">Dice Game</h1>
      </div>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center gap-4 mb-6">
            {diceResult.length > 0 ? (
              diceResult.map((value, index) => {
                const DiceIcon = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6][
                  value - 1
                ];
                return (
                  <div
                    key={index}
                    className="w-16 h-16 bg-white rounded-lg flex items-center justify-center"
                  >
                    <DiceIcon className="w-10 h-10 text-blue-600" />
                  </div>
                );
              })
            ) : (
              <>
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                  <Dice1 className="w-10 h-10 text-white" />
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                  <Dice1 className="w-10 h-10 text-white" />
                </div>
              </>
            )}
          </div>

          <Button
            onClick={rollDice}
            disabled={isRolling}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3"
          >
            {isRolling ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Rolling...
              </>
            ) : (
              <>
                <Dice6 className="w-5 h-5 mr-2" />
                Roll Dice
              </>
            )}
          </Button>

          {diceResult.length > 0 && (
            <div className="mt-6 p-4 bg-white/20 rounded-lg">
              <p className="text-white text-lg">
                Total: {diceResult.reduce((a, b) => a + b, 0)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Glass overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]"></div>
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-800/90 to-indigo-900/90 backdrop-blur-md shadow-2xl sticky top-0 z-50 border-b border-white/10">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="py-6 space-y-2">
                  {menuItems.map((item, index) => (
                    <button
                      key={index}
                      className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
                      onClick={() => {
                        navigate(item.href);
                        setIsMenuOpen(false);
                      }}
                    >
                      <item.icon className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            {/* Center: Title */}
            <h1 className="text-2xl font-bold text-white">Play Games</h1>

            {/* Right: Wallet */}
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Wallet className="w-5 h-5 text-yellow-300" />
              <span className="text-white font-bold">
                ₹{walletBalance.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative container max-w-6xl mx-auto px-4 py-8 z-10">
        {currentGame === "selection" && renderGameSelection()}
        {currentGame === "matka" && renderMatkaGame()}
        {currentGame === "colorking" && renderColorKing()}
        {currentGame === "dicegame" && renderDiceGame()}
      </main>

      {/* Bet Confirmation Dialog */}
      <Dialog open={showBetDialog} onOpenChange={setShowBetDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Confirm Your Bet</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Bet Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Game:</span>
                  <span>Matka</span>
                </div>
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span>
                    {bettingTypes.find((t) => t.id === betData.type)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Numbers:</span>
                  <span>{betData.numbers.join(", ")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bet Amount:</span>
                  <span>₹{betData.betAmount}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Potential Winnings:</span>
                  <span>₹{betData.potentialWinnings}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowBetDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmBet}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Confirm Bet
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
