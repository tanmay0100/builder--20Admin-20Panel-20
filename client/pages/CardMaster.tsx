import React from "react";
import { StatsCard } from "@/components/StatsCard";
import { PieChart } from "@/components/Charts";
import { DollarSign, Users, TrendingUp, Target } from "lucide-react";

const cardData = [
  { label: "Hearts", value: 30 },
  { label: "Diamonds", value: 25 },
  { label: "Clubs", value: 23 },
  { label: "Spades", value: 22 },
];

export function CardMaster() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Card Master</h1>
        <p className="text-muted-foreground">
          Manage card-based games and monitor suit preferences
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Bets Today"
          value="892"
          change={{ value: 3.2, type: "increase" }}
          icon={<Target className="w-5 h-5 text-primary" />}
        />
        <StatsCard
          title="Total Amount"
          value="₹1.8L"
          change={{ value: 7.4, type: "increase" }}
          icon={<DollarSign className="w-5 h-5 text-success" />}
        />
        <StatsCard
          title="Active Players"
          value="321"
          change={{ value: 1.8, type: "increase" }}
          icon={<Users className="w-5 h-5 text-info" />}
        />
        <StatsCard
          title="Game Profit"
          value="₹45K"
          change={{ value: 9.6, type: "increase" }}
          icon={<TrendingUp className="w-5 h-5 text-success" />}
        />
      </div>

      {/* Card Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChart
          data={cardData}
          title="Card Suit Betting Distribution"
          className="lg:col-span-1"
        />

        <div className="bg-card rounded-xl shadow-soft border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Card Draw History
          </h3>
          <div className="space-y-4">
            {[
              {
                user: "cardking",
                card: "Ace ♠",
                amount: 3200,
                time: "4 mins ago",
              },
              {
                user: "hearts99",
                card: "King ♥",
                amount: 2500,
                time: "7 mins ago",
              },
              {
                user: "diamond7",
                card: "Queen ♦",
                amount: 1800,
                time: "10 mins ago",
              },
              {
                user: "clubber",
                card: "Jack ♣",
                amount: 2100,
                time: "13 mins ago",
              },
            ].map((draw, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-12 bg-white rounded border-2 border-border flex items-center justify-center shadow-sm">
                    <span className="text-xs font-bold">{draw.card}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      {draw.user}
                    </span>
                    <p className="text-sm text-muted-foreground">
                      Drew {draw.card}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-success">
                    ₹{draw.amount}
                  </span>
                  <p className="text-xs text-muted-foreground">{draw.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
