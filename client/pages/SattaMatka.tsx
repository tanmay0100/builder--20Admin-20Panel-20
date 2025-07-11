import React from "react";
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
  Crown,
  Zap,
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
];

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="w-4 h-4 text-satta-emerald" />;
    case "down":
      return <TrendingUp className="w-4 h-4 text-satta-crimson rotate-180" />;
    default:
      return <Zap className="w-4 h-4 text-satta-amber" />;
  }
};

export function SattaMatka() {
  return (
    <div className="space-y-8">
      {/* Enhanced Header with Gradient Background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-satta p-8 text-white shadow-luxury">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <Crown className="w-8 h-8 text-satta-gold drop-shadow-lg" />
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              Satta Matka Management
            </h1>
          </div>
          <p className="text-white/90 text-lg font-medium">
            Premium market monitoring and management dashboard
          </p>
        </div>
        <div className="absolute top-4 right-4 text-satta-gold">
          <Star className="w-6 h-6 animate-pulse" />
        </div>
      </div>

      {/* Enhanced Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Markets"
          value="12"
          icon={<CircleDot className="w-5 h-5 text-satta-royal" />}
          className="border-gradient-gold"
        />
        <StatsCard
          title="Active Markets"
          value="8"
          change={{ value: 2, type: "increase" }}
          icon={<Clock className="w-5 h-5 text-satta-emerald" />}
          className="hover:shadow-luxury transition-shadow duration-300"
        />
        <StatsCard
          title="Total Bets Today"
          value="1,847"
          change={{ value: 12.5, type: "increase" }}
          icon={<Users className="w-5 h-5 text-satta-amber" />}
          className="hover:shadow-luxury transition-shadow duration-300"
        />
        <StatsCard
          title="Total Amount"
          value="₹12.8L"
          change={{ value: 8.3, type: "increase" }}
          icon={<DollarSign className="w-5 h-5 text-satta-gold" />}
          className="border-gradient-gold"
        />
      </div>

      {/* Enhanced Market Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {mockMarkets.map((market, index) => (
          <div
            key={index}
            className="group relative bg-card rounded-2xl shadow-luxury border border-border p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105"
          >
            {/* Market Header with Status */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-satta-gold/10 rounded-full">
                  <Trophy className="w-5 h-5 text-satta-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-satta-gold transition-colors">
                    {market.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    {getTrendIcon(market.trend)}
                    <span className="text-sm text-muted-foreground">
                      {market.trend === "up"
                        ? "Trending"
                        : market.trend === "down"
                          ? "Declining"
                          : "Stable"}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
                  market.status === "open"
                    ? "bg-gradient-market-open text-white shadow-lg"
                    : "bg-gradient-market-closed text-white shadow-lg"
                }`}
              >
                {market.status}
              </div>
            </div>

            {/* Market Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-satta-gold/5 rounded-xl p-4">
                <p className="text-sm text-muted-foreground font-medium">
                  Total Bets
                </p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {market.totalBets}
                </p>
              </div>
              <div className="bg-satta-emerald/5 rounded-xl p-4">
                <p className="text-sm text-muted-foreground font-medium">
                  Total Amount
                </p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  ₹{market.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Popularity Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">
                  Market Popularity
                </span>
                <span className="text-sm font-bold text-satta-gold">
                  {market.popularity}%
                </span>
              </div>
              <Progress value={market.popularity} className="h-2 bg-muted/30" />
            </div>

            {/* Amount Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">
                  Amount Progress
                </span>
                <span className="text-sm font-bold text-satta-emerald">
                  {Math.round((market.totalAmount / market.maxAmount) * 100)}%
                </span>
              </div>
              <Progress
                value={(market.totalAmount / market.maxAmount) * 100}
                className="h-2 bg-muted/30"
              />
            </div>

            {/* Top Numbers Section */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-foreground mb-4 flex items-center">
                <Star className="w-4 h-4 text-satta-gold mr-2" />
                Top 3 Numbers Today
              </h4>
              <div className="space-y-3">
                {market.topNumbers.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 bg-gradient-to-r from-satta-gold/5 to-transparent rounded-lg border border-satta-gold/20"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          idx === 0
                            ? "bg-satta-gold text-black"
                            : idx === 1
                              ? "bg-satta-amber text-black"
                              : "bg-satta-royal text-white"
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <span className="text-sm font-bold text-foreground block">
                          {item.type}
                        </span>
                        <span className="text-lg font-bold text-satta-gold">
                          {item.number}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-satta-emerald block">
                        ₹{item.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Action Button */}
            <Link to={`/games/satta-matka/${market.name.toLowerCase()}`}>
              <Button
                className="w-full bg-gradient-to-r from-satta-gold to-satta-amber hover:from-satta-amber hover:to-satta-gold text-black font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                variant="default"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Market Details
                <Crown className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
