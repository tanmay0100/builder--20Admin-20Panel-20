import React from "react";
import { StatsCard } from "@/components/StatsCard";
import { BarChart } from "@/components/Charts";
import { DollarSign, Users, TrendingUp, Target } from "lucide-react";

const diceData = [
  { label: "1", value: 45000 },
  { label: "2", value: 38000 },
  { label: "3", value: 52000 },
  { label: "4", value: 41000 },
  { label: "5", value: 47000 },
  { label: "6", value: 55000 },
];

export function RollDice() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Roll the Dice</h1>
        <p className="text-muted-foreground">
          Manage dice rolling game, monitor number preferences and payouts
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Rolls Today"
          value="2,847"
          change={{ value: 15.2, type: "increase" }}
          icon={<Target className="w-5 h-5 text-primary" />}
        />
        <StatsCard
          title="Total Amount"
          value="₹5.8L"
          change={{ value: 9.8, type: "increase" }}
          icon={<DollarSign className="w-5 h-5 text-success" />}
        />
        <StatsCard
          title="Active Players"
          value="892"
          change={{ value: 7.1, type: "increase" }}
          icon={<Users className="w-5 h-5 text-info" />}
        />
        <StatsCard
          title="Game Profit"
          value="₹1.2L"
          change={{ value: 18.5, type: "increase" }}
          icon={<TrendingUp className="w-5 h-5 text-success" />}
        />
      </div>

      {/* Dice Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart
          data={diceData}
          title="Number-wise Betting Amount"
          className="lg:col-span-1"
        />

        <div className="bg-card rounded-xl shadow-soft border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Live Dice Rolls
          </h3>
          <div className="space-y-4">
            {[
              { user: "roller123", number: 6, amount: 1500, time: "1 min ago" },
              { user: "dice456", number: 3, amount: 2200, time: "3 mins ago" },
              { user: "lucky789", number: 1, amount: 800, time: "5 mins ago" },
              {
                user: "player321",
                number: 5,
                amount: 1800,
                time: "7 mins ago",
              },
            ].map((roll, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                    {roll.number}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      {roll.user}
                    </span>
                    <p className="text-sm text-muted-foreground">
                      Bet on {roll.number}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-primary">
                    ₹{roll.amount}
                  </span>
                  <p className="text-xs text-muted-foreground">{roll.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
