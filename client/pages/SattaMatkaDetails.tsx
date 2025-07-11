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

const bettingTypeData = [
  { label: "Single Ank", value: 125000, color: "bg-primary" },
  { label: "Jodi", value: 85000, color: "bg-success" },
  { label: "Single Patti", value: 65000, color: "bg-warning" },
  { label: "Double Patti", value: 45000, color: "bg-info" },
  { label: "Triple Patti", value: 32000, color: "bg-destructive" },
  { label: "Half Sangam", value: 28000, color: "bg-purple-500" },
  { label: "Full Sangam", value: 15000, color: "bg-orange-500" },
];

const mockNumberData = {
  "Single Ank": [
    { number: "0", amount: 15000, users: 12 },
    { number: "1", amount: 8500, users: 8 },
    { number: "2", amount: 12000, users: 10 },
    { number: "3", amount: 6800, users: 6 },
    { number: "4", amount: 9200, users: 7 },
    { number: "5", amount: 25000, users: 18 },
    { number: "6", amount: 4500, users: 5 },
    { number: "7", amount: 18000, users: 14 },
    { number: "8", amount: 11000, users: 9 },
    { number: "9", amount: 7800, users: 7 },
  ],
  Jodi: [
    { number: "12", amount: 18000, users: 12 },
    { number: "25", amount: 22000, users: 15 },
    { number: "37", amount: 15000, users: 10 },
    { number: "48", amount: 12000, users: 8 },
    { number: "59", amount: 8500, users: 6 },
  ],
  "Single Patti": [
    { number: "125", amount: 15000, users: 8 },
    { number: "238", amount: 12000, users: 6 },
    { number: "457", amount: 18000, users: 10 },
    { number: "689", amount: 9500, users: 5 },
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart
          data={bettingTypeData}
          title="Betting Analysis by Type"
          className="lg:col-span-1"
        />

        <div className="bg-card rounded-xl shadow-soft border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Betting Type Details
          </h3>
          <div className="space-y-3">
            {bettingTypeData.map((type, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(type.label)}
                className={cn(
                  "w-full flex justify-between items-center p-3 rounded-lg transition-all hover:scale-[1.02]",
                  activeTab === type.label
                    ? "bg-primary/10 border-2 border-primary"
                    : "bg-muted/50 border-2 border-transparent hover:bg-muted/70",
                )}
              >
                <span className="font-medium text-foreground">
                  {type.label}
                </span>
                <span className="font-semibold text-primary">
                  ₹{type.value.toLocaleString()}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Number-wise Analysis for Selected Type */}
      {activeTab && (
        <div className="bg-card rounded-xl shadow-soft border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            {activeTab} - Number-wise Analysis
          </h3>

          {mockNumberData[activeTab as keyof typeof mockNumberData] ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-medium text-foreground mb-4">
                  Top Numbers by Amount
                </h4>
                <div className="space-y-3">
                  {mockNumberData[activeTab as keyof typeof mockNumberData]
                    .sort((a, b) => b.amount - a.amount)
                    .slice(0, 5)
                    .map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedNumber(item.number)}
                        className={cn(
                          "w-full flex justify-between items-center p-3 rounded-lg border-2 transition-all hover:scale-[1.02]",
                          item.amount > 15000
                            ? "bg-destructive/10 border-destructive"
                            : item.amount > 10000
                              ? "bg-warning/10 border-warning"
                              : "bg-success/10 border-success",
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm",
                              item.amount > 15000
                                ? "bg-destructive text-destructive-foreground"
                                : item.amount > 10000
                                  ? "bg-warning text-warning-foreground"
                                  : "bg-success text-success-foreground",
                            )}
                          >
                            {item.number}
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-foreground">
                              ₹{item.amount.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {item.users} users
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Click for details
                        </div>
                      </button>
                    ))}
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium text-foreground mb-4">
                  Complete Number Grid
                </h4>
                <div className="grid grid-cols-5 gap-2">
                  {mockNumberData[activeTab as keyof typeof mockNumberData].map(
                    (item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedNumber(item.number)}
                        className={cn(
                          "aspect-square p-2 rounded-lg border-2 transition-all hover:scale-105 text-xs",
                          item.amount > 15000
                            ? "bg-destructive/10 border-destructive text-destructive"
                            : item.amount > 10000
                              ? "bg-warning/10 border-warning text-warning"
                              : "bg-success/10 border-success text-success",
                        )}
                      >
                        <div className="font-bold">{item.number}</div>
                        <div>₹{(item.amount / 1000).toFixed(0)}K</div>
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">
                No detailed data available for {activeTab}
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
                Close Details
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
