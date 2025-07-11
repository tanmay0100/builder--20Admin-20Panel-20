import React from "react";
import { StatsCard } from "@/components/StatsCard";
import { DollarSign, Users, TrendingUp, Target } from "lucide-react";

export function LuckyNumbers() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Lucky Numbers</h1>
        <p className="text-muted-foreground">
          Manage lucky number games and monitor betting patterns
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Bets Today"
          value="1,456"
          change={{ value: 6.8, type: "increase" }}
          icon={<Target className="w-5 h-5 text-primary" />}
        />
        <StatsCard
          title="Total Amount"
          value="₹3.2L"
          change={{ value: 4.5, type: "increase" }}
          icon={<DollarSign className="w-5 h-5 text-success" />}
        />
        <StatsCard
          title="Active Players"
          value="432"
          change={{ value: 2.3, type: "increase" }}
          icon={<Users className="w-5 h-5 text-info" />}
        />
        <StatsCard
          title="Game Profit"
          value="₹68K"
          change={{ value: 11.2, type: "increase" }}
          icon={<TrendingUp className="w-5 h-5 text-success" />}
        />
      </div>

      {/* Lucky Numbers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl shadow-soft border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Hot Numbers (Most Bet)
          </h3>
          <div className="grid grid-cols-5 gap-3">
            {[7, 13, 21, 3, 9, 17, 25, 1, 11, 19].map((number, idx) => (
              <div
                key={idx}
                className="aspect-square bg-primary/10 rounded-lg flex items-center justify-center border-2 border-primary/20 hover:border-primary/40 transition-colors"
              >
                <span className="text-lg font-bold text-primary">{number}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-soft border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Recent Winners
          </h3>
          <div className="space-y-4">
            {[
              {
                user: "lucky777",
                number: 7,
                amount: 5000,
                time: "3 mins ago",
              },
              {
                user: "number13",
                number: 13,
                amount: 2800,
                time: "6 mins ago",
              },
              {
                user: "winner21",
                number: 21,
                amount: 4200,
                time: "9 mins ago",
              },
              {
                user: "player3",
                number: 3,
                amount: 1500,
                time: "12 mins ago",
              },
            ].map((winner, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center text-success-foreground font-bold text-sm">
                    {winner.number}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      {winner.user}
                    </span>
                    <p className="text-sm text-muted-foreground">
                      Won on {winner.number}
                    </p>
                  </div>
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
