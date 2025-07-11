import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/StatsCard";
import {
  ArrowLeft,
  Users,
  DollarSign,
  Target,
  Clock,
  Circle,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const betTypes = [
  "Single Ank",
  "Jodi",
  "Single Patti",
  "Double Patti",
  "Triple Patti",
  "Half Sangam",
  "Full Sangam",
];

const mockBettingData = {
  "Single Ank": [
    { number: "0", amount: 15000 },
    { number: "1", amount: 8500 },
    { number: "2", amount: 12000 },
    { number: "3", amount: 6800 },
    { number: "4", amount: 9200 },
    { number: "5", amount: 25000 },
    { number: "6", amount: 4500 },
    { number: "7", amount: 18000 },
    { number: "8", amount: 11000 },
    { number: "9", amount: 7800 },
  ],
  Jodi: [
    { number: "12", amount: 18000 },
    { number: "25", amount: 22000 },
    { number: "37", amount: 15000 },
    { number: "48", amount: 12000 },
    { number: "59", amount: 8500 },
  ],
  "Single Patti": [
    { number: "125", amount: 15000 },
    { number: "238", amount: 12000 },
    { number: "457", amount: 18000 },
    { number: "689", amount: 9500 },
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
    // Mock data for users who bet on this number
    return [
      { username: "player123", amount: 500, time: "12:45 PM" },
      { username: "lucky777", amount: 800, time: "12:30 PM" },
      { username: "winner99", amount: 1200, time: "12:15 PM" },
    ];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/games/satta-matka">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Markets
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {marketName || "Market"} - Detailed View
          </h1>
          <p className="text-muted-foreground">
            Complete analysis and live monitoring
          </p>
        </div>
      </div>

      {/* Overview Section */}
      <div className="bg-card rounded-xl shadow-soft border border-border p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Users Today"
            value="234"
            icon={<Users className="w-5 h-5 text-primary" />}
          />
          <StatsCard
            title="Total Bets Count"
            value="1,567"
            icon={<Target className="w-5 h-5 text-info" />}
          />
          <StatsCard
            title="Total Amount"
            value="₹1.56L"
            icon={<DollarSign className="w-5 h-5 text-success" />}
          />
          <div className="bg-card rounded-xl p-4 shadow-soft border border-border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Circle className="w-5 h-5 text-success fill-current" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Market Status
                </p>
                <p className="text-lg font-bold text-success">OPEN</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Bets Section */}
      <div className="bg-card rounded-xl shadow-soft border border-border p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertCircle className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            Live Bets - Real Time
          </h2>
        </div>
        <div className="space-y-3">
          {liveBets.map((bet) => (
            <div
              key={bet.id}
              className="flex justify-between items-center p-3 bg-muted/30 rounded-lg border-l-4 border-l-primary"
            >
              <div>
                <span className="font-medium text-foreground">
                  {bet.username}
                </span>
                <p className="text-sm text-muted-foreground">{bet.type}</p>
              </div>
              <div className="text-right">
                <span className="font-semibold text-primary">
                  ₹{bet.amount}
                </span>
                <p className="text-xs text-muted-foreground">{bet.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Betting Analysis Section */}
      <div className="bg-card rounded-xl shadow-soft border border-border p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Betting Analysis by Type
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {betTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                activeTab === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80",
              )}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Number-wise Heatmap */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            {activeTab} - Number-wise Total Amount
          </h3>

          {mockBettingData[activeTab as keyof typeof mockBettingData] ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {mockBettingData[activeTab as keyof typeof mockBettingData].map(
                (item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedNumber(item.number)}
                    className={cn(
                      "p-4 rounded-lg border-2 transition-all hover:scale-105",
                      item.amount > 15000
                        ? "bg-destructive/10 border-destructive text-destructive"
                        : item.amount > 10000
                          ? "bg-warning/10 border-warning text-warning"
                          : "bg-success/10 border-success text-success",
                    )}
                  >
                    <div className="text-lg font-bold">{item.number}</div>
                    <div className="text-sm">
                      ₹{item.amount.toLocaleString()}
                    </div>
                  </button>
                ),
              )}
            </div>
          ) : (
            <div className="text-center p-8 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">
                No data available for {activeTab}
              </p>
            </div>
          )}

          {/* User-wise Breakdown */}
          {selectedNumber && (
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <h4 className="text-md font-medium text-foreground mb-3">
                Users who bet on {activeTab}: {selectedNumber}
              </h4>
              <div className="space-y-2">
                {getUsersForNumber(selectedNumber).map((user, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-2 bg-card rounded"
                  >
                    <span className="font-medium">{user.username}</span>
                    <div className="text-right">
                      <span className="font-semibold text-primary">
                        ₹{user.amount}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {user.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setSelectedNumber(null)}
                className="mt-3 text-sm text-primary hover:text-primary/80"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
