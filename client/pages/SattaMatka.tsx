import React from "react";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/StatsCard";
import {
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Eye,
  CircleDot,
} from "lucide-react";

interface MarketData {
  name: string;
  totalBets: number;
  totalAmount: number;
  status: "open" | "closed";
  topNumbers: Array<{ type: string; number: string; amount: number }>;
}

const mockMarkets: MarketData[] = [
  {
    name: "Shridevi",
    totalBets: 234,
    totalAmount: 156000,
    status: "open",
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
    status: "open",
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
    status: "closed",
    topNumbers: [
      { type: "Single Ank", number: "9", amount: 15000 },
      { type: "Jodi", number: "49", amount: 11000 },
      { type: "Single Patti", number: "349", amount: 8000 },
    ],
  },
];

export function SattaMatka() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Satta Matka Management
        </h1>
        <p className="text-muted-foreground">
          Monitor and manage all Satta Matka markets
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Markets"
          value="12"
          icon={<CircleDot className="w-5 h-5 text-primary" />}
        />
        <StatsCard
          title="Active Markets"
          value="8"
          change={{ value: 2, type: "increase" }}
          icon={<Clock className="w-5 h-5 text-success" />}
        />
        <StatsCard
          title="Total Bets Today"
          value="1,847"
          change={{ value: 12.5, type: "increase" }}
          icon={<Users className="w-5 h-5 text-info" />}
        />
        <StatsCard
          title="Total Amount"
          value="₹12.8L"
          change={{ value: 8.3, type: "increase" }}
          icon={<DollarSign className="w-5 h-5 text-success" />}
        />
      </div>

      {/* Market Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockMarkets.map((market, index) => (
          <div
            key={index}
            className="bg-card rounded-xl shadow-soft border border-border p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-foreground">
                {market.name}
              </h3>
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  market.status === "open"
                    ? "bg-success/10 text-success"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {market.status.toUpperCase()}
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Bets</p>
                  <p className="text-lg font-semibold text-foreground">
                    {market.totalBets}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-lg font-semibold text-foreground">
                    ₹{market.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">
                  Top 3 Numbers Today
                </h4>
                <div className="space-y-2">
                  {market.topNumbers.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-2 bg-muted/50 rounded-lg"
                    >
                      <div>
                        <span className="text-sm font-medium text-foreground">
                          {item.type}: {item.number}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-primary">
                        ₹{item.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
