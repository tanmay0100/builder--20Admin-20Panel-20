import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatsCard } from "@/components/StatsCard";
import {
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Eye,
  CircleDot,
  Star,
  Trophy,
  Zap,
  LayoutGrid,
  List,
} from "lucide-react";

interface MarketData {
  name: string;
  totalBets: number;
  totalAmount: number;
  maxAmount: number;
  status: "open" | "closed";
  topNumbers: Array<{ type: string; number: string; amount: number }>;
  popularity: number;
  trend: "up" | "down" | "stable";
}

const mockMarkets: MarketData[] = [
  {
    name: "Shridevi",
    totalBets: 234,
    totalAmount: 156000,
    maxAmount: 200000,
    status: "open",
    popularity: 85,
    trend: "up",
    topNumbers: [
      { type: "Single Ank", number: "5", amount: 25000 },
      { type: "Jodi", number: "25", amount: 18000 },
      { type: "Single Patti", number: "125", amount: 15000 },
    ],
  },
  {
    name: "Milan",
    totalBets: 189,
    totalAmount: 98000,
    maxAmount: 150000,
    status: "open",
    popularity: 72,
    trend: "stable",
    topNumbers: [
      { type: "Single Ank", number: "7", amount: 20000 },
      { type: "Jodi", number: "37", amount: 12000 },
      { type: "Double Patti", number: "778", amount: 10000 },
    ],
  },
  {
    name: "Madhur",
    totalBets: 145,
    totalAmount: 87000,
    maxAmount: 120000,
    status: "closed",
    popularity: 68,
    trend: "down",
    topNumbers: [
      { type: "Single Ank", number: "9", amount: 15000 },
      { type: "Jodi", number: "49", amount: 11000 },
      { type: "Single Patti", number: "349", amount: 8000 },
    ],
  },
  {
    name: "Kalyan",
    totalBets: 312,
    totalAmount: 201000,
    maxAmount: 250000,
    status: "open",
    popularity: 92,
    trend: "up",
    topNumbers: [
      { type: "Single Ank", number: "3", amount: 35000 },
      { type: "Jodi", number: "13", amount: 22000 },
      { type: "Single Patti", number: "213", amount: 18000 },
    ],
  },
  {
    name: "Main Bazar",
    totalBets: 278,
    totalAmount: 178000,
    maxAmount: 220000,
    status: "open",
    popularity: 81,
    trend: "up",
    topNumbers: [
      { type: "Single Ank", number: "8", amount: 28000 },
      { type: "Jodi", number: "48", amount: 15000 },
      { type: "Double Patti", number: "888", amount: 12000 },
    ],
  },
  {
    name: "Time Bazar",
    totalBets: 156,
    totalAmount: 94000,
    maxAmount: 140000,
    status: "open",
    popularity: 67,
    trend: "stable",
    topNumbers: [
      { type: "Single Ank", number: "2", amount: 18000 },
      { type: "Jodi", number: "12", amount: 14000 },
      { type: "Single Patti", number: "012", amount: 11000 },
    ],
  },
];

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="w-3 h-3 text-green-600" />;
    case "down":
      return <TrendingUp className="w-3 h-3 text-red-600 rotate-180" />;
    default:
      return <Zap className="w-3 h-3 text-orange-500" />;
  }
};

export function SattaMatka() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-6">
      {/* Simple Header */}
      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <CircleDot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Satta Matka Management
              </h1>
              <p className="text-muted-foreground text-sm md:text-base">
                Market monitoring dashboard
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant={viewMode === "grid" ? "default" : "outline"}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === "list" ? "default" : "outline"}
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Total Markets"
          value="12"
          icon={<CircleDot className="w-4 h-4 text-primary" />}
        />
        <StatsCard
          title="Total Bets"
          value="1,847"
          change={{ value: 12.5, type: "increase" }}
          icon={<Users className="w-4 h-4 text-blue-600" />}
        />
        <StatsCard
          title="Total Amount"
          value="₹12.8L"
          change={{ value: 8.3, type: "increase" }}
          icon={<DollarSign className="w-4 h-4 text-green-600" />}
        />
      </div>

      {/* Markets Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockMarkets.map((market, index) => (
            <div
              key={index}
              className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-primary rounded-md">
                    <Trophy className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {market.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(market.trend)}
                      <span className="text-xs text-muted-foreground">
                        {market.popularity}% popular
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-2 py-1 rounded bg-muted">
                  <div className="text-xs font-medium text-foreground">
                    {new Date().toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </div>
                  <div className="text-xs text-muted-foreground">Today</div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-muted rounded p-2">
                  <div className="flex items-center space-x-1 mb-1">
                    <Users className="w-3 h-3 text-blue-600" />
                    <p className="text-xs text-muted-foreground">Bets</p>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {market.totalBets}
                  </p>
                </div>
                <div className="bg-muted rounded p-2">
                  <div className="flex items-center space-x-1 mb-1">
                    <DollarSign className="w-3 h-3 text-green-600" />
                    <p className="text-xs text-muted-foreground">Amount</p>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    ₹{(market.totalAmount / 1000).toFixed(0)}K
                  </p>
                </div>
              </div>

              {/* Top Number */}
              <div className="mb-3">
                <div className="flex items-center space-x-1 mb-1">
                  <Star className="w-3 h-3 text-orange-500" />
                  <span className="text-xs text-muted-foreground">
                    Hot Number
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {market.topNumbers[0].number}
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block">
                        {market.topNumbers[0].type}
                      </span>
                      <span className="text-xs font-semibold text-green-600">
                        ₹{(market.topNumbers[0].amount / 1000).toFixed(0)}K
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    #{index + 1} trending
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Link to={`/games/satta-matka/${market.name.toLowerCase()}`}>
                <Button size="sm" className="w-full" variant="default">
                  <Eye className="w-3 h-3 mr-1" />
                  View Details
                </Button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-muted border-b border-border font-semibold text-sm text-foreground">
            <div className="col-span-3">Market</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2">Bets</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-2">Top Number</div>
            <div className="col-span-1">Action</div>
          </div>
          {mockMarkets.map((market, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 p-4 border-b border-border hover:bg-muted/50 transition-colors"
            >
              <div className="col-span-3 flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-orange-500" />
                <div>
                  <div className="font-semibold text-foreground">
                    {market.name}
                  </div>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(market.trend)}
                    <span className="text-xs text-muted-foreground">
                      {market.popularity}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex items-center">
                <div className="px-3 py-1 rounded bg-muted">
                  <div className="text-xs font-medium text-foreground">
                    {new Date().toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </div>
                  <div className="text-xs text-muted-foreground">Today</div>
                </div>
              </div>
              <div className="col-span-2 flex items-center">
                <span className="font-semibold text-foreground">
                  {market.totalBets}
                </span>
              </div>
              <div className="col-span-2 flex items-center">
                <span className="font-semibold text-foreground">
                  ₹{market.totalAmount.toLocaleString()}
                </span>
              </div>
              <div className="col-span-2 flex items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {market.topNumbers[0].number}
                  </div>
                  <span className="text-sm text-green-600 font-semibold">
                    ₹{(market.topNumbers[0].amount / 1000).toFixed(0)}K
                  </span>
                </div>
              </div>
              <div className="col-span-1 flex items-center">
                <Link to={`/games/satta-matka/${market.name.toLowerCase()}`}>
                  <Button size="sm" variant="outline">
                    <Eye className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
