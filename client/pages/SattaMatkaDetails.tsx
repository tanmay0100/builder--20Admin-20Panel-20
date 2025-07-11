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

// Generate Jodi data (00-99)
const generateJodiData = () => {
  const data = [];
  for (let i = 0; i <= 99; i++) {
    const numberStr = i.toString().padStart(2, "0");
    const amount = Math.floor(Math.random() * 25000) + 1000;
    const users = Math.floor(amount / 1500) + 1;
    data.push({ number: numberStr, amount, users });
  }
  return data.sort((a, b) => b.amount - a.amount);
};

// Generate popular Patti numbers (220 total, showing top ones)
const generatePattiData = () => {
  const popularPattis = [
    "128",
    "137",
    "146",
    "236",
    "245",
    "289",
    "234",
    "567",
    "678",
    "789",
    "012",
    "123",
    "234",
    "345",
    "456",
    "890",
    "901",
    "013",
    "024",
    "035",
    "046",
    "057",
    "068",
    "079",
    "189",
    "278",
    "367",
    "456",
    "145",
    "029",
    "138",
    "247",
    "356",
    "689",
    "578",
    "467",
    "129",
    "038",
    "147",
    "256",
    "134",
    "025",
    "016",
    "789",
    "678",
    "567",
    "456",
    "345",
    "234",
    "123",
  ];

  return popularPattis
    .map((patti) => ({
      number: patti,
      amount: Math.floor(Math.random() * 30000) + 5000,
      users: Math.floor(Math.random() * 20) + 3,
    }))
    .sort((a, b) => b.amount - a.amount);
};

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
  Jodi: generateJodiData(),
  "Single Patti": generatePattiData(),
  "Double Patti": generatePattiData().slice(0, 30),
  "Triple Patti": generatePattiData().slice(0, 20),
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
        <div className="space-y-6">
          {/* Single Ank Layout */}
          {activeTab === "Single Ank" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BarChart
                data={mockNumberData["Single Ank"]
                  .map((item) => ({
                    label: `Number ${item.number}`,
                    value: item.amount,
                    color:
                      item.amount > 15000
                        ? "bg-destructive"
                        : item.amount > 10000
                          ? "bg-warning"
                          : "bg-success",
                  }))
                  .sort((a, b) => b.value - a.value)}
                title="Single Ank - Numbers by Betting Amount"
                className="lg:col-span-1"
              />

              <div className="bg-card rounded-xl shadow-soft border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Single Ank (0-9) - Click for Details
                </h3>
                <div className="grid grid-cols-5 gap-3">
                  {mockNumberData["Single Ank"]
                    .sort((a, b) => b.amount - a.amount)
                    .map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedNumber(item.number)}
                        className={cn(
                          "aspect-square p-3 rounded-lg border-2 transition-all hover:scale-105",
                          item.amount > 15000
                            ? "bg-destructive/10 border-destructive"
                            : item.amount > 10000
                              ? "bg-warning/10 border-warning"
                              : "bg-success/10 border-success",
                        )}
                      >
                        <div className="text-2xl font-bold">{item.number}</div>
                        <div className="text-xs mt-1">
                          ₹{(item.amount / 1000).toFixed(0)}K
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Jodi Layout (00-99) */}
          {activeTab === "Jodi" && (
            <div className="space-y-6">
              <BarChart
                data={mockNumberData["Jodi"].slice(0, 15).map((item) => ({
                  label: `${item.number}`,
                  value: item.amount,
                  color:
                    item.amount > 20000
                      ? "bg-destructive"
                      : item.amount > 15000
                        ? "bg-warning"
                        : "bg-success",
                }))}
                title="Top 15 Jodi by Betting Amount"
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-card rounded-xl shadow-soft border border-border p-6">
                  <h4 className="text-md font-semibold text-foreground mb-4">
                    🔥 Hot Jodi
                  </h4>
                  <div className="space-y-2">
                    {mockNumberData["Jodi"].slice(0, 12).map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedNumber(item.number)}
                        className="w-full flex justify-between items-center p-2 rounded-lg bg-destructive/10 border border-destructive/20 hover:bg-destructive/20 transition-colors"
                      >
                        <span className="font-bold text-destructive">
                          {item.number}
                        </span>
                        <span className="text-sm font-medium">
                          ₹{(item.amount / 1000).toFixed(0)}K
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-xl shadow-soft border border-border p-6">
                  <h4 className="text-md font-semibold text-foreground mb-4">
                    📊 Medium Range
                  </h4>
                  <div className="space-y-2">
                    {mockNumberData["Jodi"].slice(12, 24).map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedNumber(item.number)}
                        className="w-full flex justify-between items-center p-2 rounded-lg bg-warning/10 border border-warning/20 hover:bg-warning/20 transition-colors"
                      >
                        <span className="font-bold text-warning">
                          {item.number}
                        </span>
                        <span className="text-sm font-medium">
                          ₹{(item.amount / 1000).toFixed(0)}K
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-xl shadow-soft border border-border p-6">
                  <h4 className="text-md font-semibold text-foreground mb-4">
                    📈 All Jodi Grid (00-99)
                  </h4>
                  <div className="grid grid-cols-8 gap-1 max-h-64 overflow-y-auto">
                    {Array.from({ length: 100 }, (_, i) => {
                      const numberStr = i.toString().padStart(2, "0");
                      const data = mockNumberData["Jodi"].find(
                        (item) => item.number === numberStr,
                      );
                      const amount = data?.amount || 0;
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedNumber(numberStr)}
                          className={cn(
                            "p-1 text-xs font-bold rounded transition-all hover:scale-105",
                            amount > 20000
                              ? "bg-destructive/20 text-destructive border border-destructive/30"
                              : amount > 15000
                                ? "bg-warning/20 text-warning border border-warning/30"
                                : amount > 10000
                                  ? "bg-success/20 text-success border border-success/30"
                                  : "bg-muted/20 text-muted-foreground border border-muted/30",
                          )}
                          title={`${numberStr}: ₹${amount.toLocaleString()}`}
                        >
                          {numberStr}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-3 flex items-center justify-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-destructive rounded"></div>
                      <span>₹20K+</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-warning rounded"></div>
                      <span>₹15K+</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-success rounded"></div>
                      <span>₹10K+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Patti Layout */}
          {(activeTab === "Single Patti" ||
            activeTab === "Double Patti" ||
            activeTab === "Triple Patti") && (
            <div className="space-y-6">
              <BarChart
                data={
                  mockNumberData[activeTab as keyof typeof mockNumberData]
                    ?.slice(0, 15)
                    .map((item) => ({
                      label: `${item.number}`,
                      value: item.amount,
                      color:
                        item.amount > 25000
                          ? "bg-destructive"
                          : item.amount > 20000
                            ? "bg-warning"
                            : "bg-success",
                    })) || []
                }
                title={`Top 15 ${activeTab} by Betting Amount`}
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-card rounded-xl shadow-soft border border-border p-6">
                  <h4 className="text-md font-semibold text-foreground mb-4">
                    🔥 Hot {activeTab}
                  </h4>
                  <div className="space-y-2">
                    {mockNumberData[activeTab as keyof typeof mockNumberData]
                      ?.slice(0, 10)
                      .map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedNumber(item.number)}
                          className="w-full flex justify-between items-center p-2 rounded-lg bg-destructive/10 border border-destructive/20 hover:bg-destructive/20 transition-colors"
                        >
                          <span className="font-bold text-destructive">
                            {item.number}
                          </span>
                          <span className="text-sm font-medium">
                            ₹{(item.amount / 1000).toFixed(0)}K
                          </span>
                        </button>
                      ))}
                  </div>
                </div>

                <div className="bg-card rounded-xl shadow-soft border border-border p-6">
                  <h4 className="text-md font-semibold text-foreground mb-4">
                    📊 Medium Range
                  </h4>
                  <div className="space-y-2">
                    {mockNumberData[activeTab as keyof typeof mockNumberData]
                      ?.slice(10, 20)
                      .map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedNumber(item.number)}
                          className="w-full flex justify-between items-center p-2 rounded-lg bg-warning/10 border border-warning/20 hover:bg-warning/20 transition-colors"
                        >
                          <span className="font-bold text-warning">
                            {item.number}
                          </span>
                          <span className="text-sm font-medium">
                            ₹{(item.amount / 1000).toFixed(0)}K
                          </span>
                        </button>
                      ))}
                  </div>
                </div>

                <div className="bg-card rounded-xl shadow-soft border border-border p-6">
                  <h4 className="text-md font-semibold text-foreground mb-4">
                    📈 All {activeTab} Grid
                  </h4>
                  <div className="grid grid-cols-4 gap-1 max-h-64 overflow-y-auto">
                    {mockNumberData[
                      activeTab as keyof typeof mockNumberData
                    ]?.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedNumber(item.number)}
                        className={cn(
                          "p-2 text-xs font-bold rounded transition-all hover:scale-105",
                          item.amount > 25000
                            ? "bg-destructive/20 text-destructive border border-destructive/30"
                            : item.amount > 20000
                              ? "bg-warning/20 text-warning border border-warning/30"
                              : "bg-success/20 text-success border border-success/30",
                        )}
                        title={`₹${item.amount.toLocaleString()}`}
                      >
                        {item.number}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User-wise Breakdown Modal */}
          {selectedNumber && (
            <div className="bg-card rounded-xl shadow-soft border border-border p-6">
              <h4 className="text-lg font-medium text-foreground mb-4">
                👥 Users who bet on {activeTab}:{" "}
                <span className="text-primary font-bold">{selectedNumber}</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    ₹
                    {mockNumberData[activeTab as keyof typeof mockNumberData]
                      ?.find((item) => item.number === selectedNumber)
                      ?.amount.toLocaleString() || "0"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Amount
                  </div>
                </div>
                <div className="p-4 bg-success/5 rounded-lg">
                  <div className="text-2xl font-bold text-success">
                    {mockNumberData[
                      activeTab as keyof typeof mockNumberData
                    ]?.find((item) => item.number === selectedNumber)?.users ||
                      "0"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Users
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {getUsersForNumber(selectedNumber).map((user, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 bg-muted/30 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {idx + 1}
                        </span>
                      </div>
                      <span className="font-medium text-foreground">
                        {user.username}
                      </span>
                    </div>
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
                className="mt-4 w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                ✕ Close Details
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
