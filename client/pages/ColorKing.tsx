import React from "react";
import { StatsCard } from "@/components/StatsCard";
import { PieChart } from "@/components/Charts";
import { DollarSign, Users, TrendingUp, Target } from "lucide-react";

const colorData = [
  { label: "Red", value: 35 },
  { label: "Green", value: 28 },
  { label: "Blue", value: 22 },
  { label: "Yellow", value: 15 },
];

export function ColorKing() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Color King</h1>
        <p className="text-muted-foreground">
          Manage Color King game, monitor bets and analyze color preferences
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Bets Today"
          value="1,234"
          change={{ value: 8.5, type: "increase" }}
          icon={<Target className="w-5 h-5 text-primary" />}
        />
        <StatsCard
          title="Total Amount"
          value="₹4.2L"
          change={{ value: 12.3, type: "increase" }}
          icon={<DollarSign className="w-5 h-5 text-success" />}
        />
        <StatsCard
          title="Active Players"
          value="567"
          change={{ value: 5.2, type: "increase" }}
          icon={<Users className="w-5 h-5 text-info" />}
        />
        <StatsCard
          title="Game Profit"
          value="₹85K"
          change={{ value: 15.7, type: "increase" }}
          icon={<TrendingUp className="w-5 h-5 text-success" />}
        />
      </div>

      {/* Color Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChart
          data={colorData}
          title="Color Betting Distribution"
          className="lg:col-span-1"
        />

        <div className="bg-card rounded-xl shadow-soft border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Recent Winners
          </h3>
          <div className="space-y-4">
            {[
              {
                user: "player123",
                color: "Red",
                amount: 2500,
                time: "2 mins ago",
              },
              {
                user: "lucky456",
                color: "Green",
                amount: 1800,
                time: "5 mins ago",
              },
              {
                user: "winner789",
                color: "Blue",
                amount: 3200,
                time: "8 mins ago",
              },
            ].map((winner, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
              >
                <div>
                  <span className="font-medium text-foreground">
                    {winner.user}
                  </span>
                  <p className="text-sm text-muted-foreground">
                    Won on {winner.color}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-success">
                    ₹{winner.amount}
                  </span>
                  <p className="text-xs text-muted-foreground">{winner.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
