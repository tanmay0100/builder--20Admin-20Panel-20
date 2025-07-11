import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/StatsCard";
import { BarChart } from "@/components/Charts";
import {
  ArrowLeft,
  Users,
  DollarSign,
  Target,
  Clock,
  Star,
  Trophy,
  Crown,
  TrendingUp,
  Eye,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

const betTypes = [
  "Single Ank",
  "Jodi", 
  "Single Patti",
  "Double Patti",
  "Triple Patti",
];

const bettingTypeData = [
  { label: "Single Ank", value: 125000, color: "bg-satta-gold" },
  { label: "Jodi", value: 85000, color: "bg-satta-emerald" },
  { label: "Single Patti", value: 65000, color: "bg-satta-amber" },
  { label: "Double Patti", value: 45000, color: "bg-satta-royal" },
  { label: "Triple Patti", value: 32000, color: "bg-satta-crimson" },
];

const mockNumberData = {
  "Single Ank": [
    { number: "5", amount: 25000, users: 18 },
    { number: "7", amount: 18000, users: 14 },
    { number: "0", amount: 15000, users: 12 },
    { number: "2", amount: 12000, users: 10 },
    { number: "8", amount: 11000, users: 9 },
    { number: "4", amount: 9200, users: 7 },
    { number: "1", amount: 8500, users: 8 },
    { number: "9", amount: 7800, users: 7 },
    { number: "3", number: "6800, users: 6 },
    { number: "6", amount: 4500, users: 5 },
  ],
  Jodi: [
    { number: "25", amount: 24000, users: 16 },
    { number: "37", amount: 20000, users: 13 },
    { number: "13", amount: 18500, users: 12 },
    { number: "48", amount: 17200, users: 11 },
    { number: "52", amount: 16000, users: 10 },
    { number: "69", amount: 15800, users: 9 },
    { number: "74", amount: 14200, users: 8 },
    { number: "81", amount: 13500, users: 7 },
  ],
  "Single Patti": [
    { number: "125", amount: 28000, users: 15 },
    { number: "237", amount: 22000, users: 12 },
    { number: "346", amount: 19500, users: 11 },
    { number: "478", amount: 18000, users: 10 },
    { number: "569", amount: 16500, users: 9 },
    { number: "089", amount: 15200, users: 8 },
  ],
  "Double Patti": [
    { number: "778", amount: 32000, users: 18 },
    { number: "225", amount: 26000, users: 14 },
    { number: "336", amount: 22500, users: 12 },
    { number: "447", amount: 20000, users: 10 },
    { number: "558", amount: 18500, users: 9 },
  ],
  "Triple Patti": [
    { number: "777", amount: 45000, users: 25 },
    { number: "222", amount: 35000, users: 20 },
    { number: "333", amount: 28000, users: 16 },
    { number: "555", amount: 22000, users: 12 },
  ],
};

const liveBets = [
  {
    id: 1,
    username: "player123",
    amount: 500,
    type: "Single Ank (5)",
    time: "12:45 PM",
  },
  {
    id: 2,
    username: "lucky777", 
    amount: 1200,
    type: "Jodi (25)",
    time: "12:44 PM",
  },
  {
    id: 3,
    username: "winner99",
    amount: 800,
    type: "Single Patti (125)",
    time: "12:43 PM",
  },
  {
    id: 4,
    username: "matka_king",
    amount: 2000,
    type: "Double Patti (778)",
    time: "12:42 PM",
  },
];

export function SattaMatkaDetails() {
  const { marketName } = useParams();
  const [activeTab, setActiveTab] = useState("Single Ank");
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);

  const getUsersForNumber = (number: string) => {
    return [
      { username: "player123", amount: 500, time: "12:45 PM" },
      { username: "lucky777", amount: 800, time: "12:30 PM" },
      { username: "winner99", amount: 1200, time: "12:15 PM" },
    ];
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-satta p-6 text-white shadow-luxury">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/games/satta-matka">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Markets
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <Crown className="w-6 h-6 text-satta-gold drop-shadow-lg" />
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                    {marketName?.charAt(0).toUpperCase() + (marketName?.slice(1) || "Market")} Market
                  </h1>
                  <p className="text-white/90 text-sm md:text-base font-medium">
                    Live monitoring and detailed analysis
                  </p>
                </div>
              </div>
            </div>
            <div className="px-3 py-2 rounded-lg bg-satta-gold/20 border border-satta-gold/30">
              <div className="flex items-center space-x-2 text-satta-gold">
                <Calendar className="w-4 h-4" />
                <div>
                  <div className="text-sm font-bold">
                    {new Date().toLocaleDateString('en-IN', { 
                      day: '2-digit', 
                      month: 'short'
                    })}
                  </div>
                  <div className="text-xs">Today</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Total Users Today"
          value="234"
          change={{ value: 8.5, type: "increase" }}
          icon={<Users className="w-4 h-4 text-satta-emerald" />}
          className="border-gradient-gold"
        />
        <StatsCard
          title="Total Bets Count"
          value="1,567"
          change={{ value: 12.3, type: "increase" }}
          icon={<Target className="w-4 h-4 text-satta-amber" />}
        />
        <StatsCard
          title="Total Amount"
          value="₹1.56L"
          change={{ value: 15.7, type: "increase" }}
          icon={<DollarSign className="w-4 h-4 text-satta-gold" />}
          className="border-gradient-gold"
        />
      </div>

      {/* Live Bets Section */}
      <div className="bg-card rounded-xl shadow-luxury border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-satta-emerald to-green-400 rounded-lg">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl font-bold text-foreground">
            Live Bets - Real Time
          </h2>
          <div className="w-2 h-2 bg-satta-emerald rounded-full animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {liveBets.map((bet) => (
            <div
              key={bet.id}
              className="relative overflow-hidden bg-gradient-to-r from-satta-gold/5 via-transparent to-satta-amber/5 rounded-lg border border-satta-gold/20 p-4"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-satta-gold to-satta-amber rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-black">
                      {bet.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-foreground">
                      {bet.username}
                    </span>
                    <p className="text-sm text-muted-foreground">{bet.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-satta-emerald text-lg">
                    ₹{bet.amount}
                  </span>
                  <p className="text-xs text-muted-foreground">{bet.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Betting Types Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart
          data={bettingTypeData}
          title="Betting Analysis by Type"
          className="lg:col-span-1"
        />

        <div className="bg-card rounded-xl shadow-luxury border border-border p-6">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center">
            <Trophy className="w-5 h-5 text-satta-gold mr-2" />
            Select Betting Type
          </h3>
          <div className="space-y-3">
            {bettingTypeData.map((type, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(type.label)}
                className={cn(
                  "w-full flex justify-between items-center p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]",
                  activeTab === type.label
                    ? "bg-gradient-to-r from-satta-gold/10 to-satta-amber/10 border-2 border-satta-gold shadow-md"
                    : "bg-muted/30 border-2 border-transparent hover:bg-muted/50",
                )}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-satta-gold rounded-full"></div>
                  <span className="font-bold text-foreground">
                    {type.label}
                  </span>
                </div>
                <span className="font-bold text-satta-emerald">
                  ₹{(type.value/1000).toFixed(0)}K
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Number-wise Analysis */}
      {activeTab && (
        <div className="space-y-6">
          <div className="bg-card rounded-xl shadow-luxury border border-border p-6">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
              <Star className="w-5 h-5 text-satta-gold mr-2" />
              {activeTab} - Top Numbers
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mockNumberData[activeTab as keyof typeof mockNumberData]?.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedNumber(item.number)}
                  className="group relative overflow-hidden bg-gradient-to-br from-satta-gold/5 to-satta-amber/5 rounded-xl border border-satta-gold/20 p-4 hover:shadow-luxury transition-all duration-300 hover:scale-105"
                >
                  {/* Rank indicator */}
                  <div className="absolute top-2 right-2">
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                      idx === 0 ? "bg-satta-gold text-black" :
                      idx === 1 ? "bg-satta-amber text-black" :
                      idx === 2 ? "bg-satta-royal text-white" :
                      "bg-muted text-muted-foreground"
                    )}>
                      {idx + 1}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-satta-gold mb-2">
                      {item.number}
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-satta-emerald">
                        ₹{(item.amount/1000).toFixed(0)}K
                      </div>
                      <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
                        <Users className="w-3 h-3" />
                        <span>{item.users} users</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Number Details */}
          {selectedNumber && (
            <div className="bg-gradient-to-r from-satta-gold/5 via-satta-amber/5 to-satta-royal/5 rounded-xl border border-satta-gold/30 p-6 shadow-luxury">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold text-foreground flex items-center">
                  <Crown className="w-5 h-5 text-satta-gold mr-2" />
                  Number {selectedNumber} - User Details
                </h4>
                <Button
                  onClick={() => setSelectedNumber(null)}
                  variant="outline"
                  size="sm"
                  className="border-satta-gold text-satta-gold hover:bg-satta-gold hover:text-black"
                >
                  ✕ Close
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-satta-emerald/10 to-green-400/5 rounded-lg border border-satta-emerald/20">
                  <div className="text-2xl font-bold text-satta-emerald">
                    ₹{mockNumberData[activeTab as keyof typeof mockNumberData]
                      ?.find((item) => item.number === selectedNumber)
                      ?.amount.toLocaleString() || "0"}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Total Amount
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-satta-gold/10 to-satta-amber/5 rounded-lg border border-satta-gold/20">
                  <div className="text-2xl font-bold text-satta-gold">
                    {mockNumberData[activeTab as keyof typeof mockNumberData]
                      ?.find((item) => item.number === selectedNumber)?.users || "0"}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Total Users
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {getUsersForNumber(selectedNumber).map((user, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-4 bg-white/50 rounded-lg border border-satta-gold/20"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-satta-gold to-satta-amber rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-black">
                          {user.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-bold text-foreground">
                        {user.username}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-satta-emerald">
                        ₹{user.amount}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {user.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}