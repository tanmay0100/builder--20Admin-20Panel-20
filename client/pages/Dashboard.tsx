import React from "react";
import { StatsCard } from "@/components/StatsCard";
import { LiveActivityFeed } from "@/components/LiveActivityFeed";
import { NotificationsPanel } from "@/components/NotificationsPanel";
import { BarChart, PieChart, LineChart } from "@/components/Charts";
import {
  DollarSign,
  Users,
  TrendingUp,
  Gamepad2,
  Target,
  AlertTriangle,
} from "lucide-react";

const dailyBetsData = [
  { label: "Satta Matka", value: 850000, color: "bg-primary" },
  { label: "Color King", value: 420000, color: "bg-success" },
  { label: "Roll the Dice", value: 320000, color: "bg-warning" },
  { label: "Lucky Numbers", value: 180000, color: "bg-info" },
  { label: "Card Master", value: 95000, color: "bg-destructive" },
];

const gameParticipationData = [
  { label: "Satta Matka", value: 45 },
  { label: "Color King", value: 25 },
  { label: "Roll the Dice", value: 15 },
  { label: "Lucky Numbers", value: 10 },
  { label: "Card Master", value: 5 },
];

const profitTrendData = [
  { date: "Mon", value: 45000 },
  { date: "Tue", value: 52000 },
  { date: "Wed", value: 48000 },
  { date: "Thu", value: 61000 },
  { date: "Fri", value: 55000 },
  { date: "Sat", value: 67000 },
  { date: "Sun", value: 73000 },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your betting platform.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <StatsCard
          title="Total Bets Today"
          value="2,847"
          change={{ value: 12.5, type: "increase" }}
          icon={<Target className="w-5 h-5 text-primary" />}
        />
        <StatsCard
          title="Daily Amount"
          value="₹18.6L"
          change={{ value: 8.2, type: "increase" }}
          icon={<DollarSign className="w-5 h-5 text-success" />}
        />
        <StatsCard
          title="Active Users"
          value="1,234"
          change={{ value: 3.1, type: "increase" }}
          icon={<Users className="w-5 h-5 text-info" />}
        />
        <StatsCard
          title="Platform Profit"
          value="₹2.8L"
          change={{ value: 15.3, type: "increase" }}
          icon={<TrendingUp className="w-5 h-5 text-success" />}
        />
        <StatsCard
          title="Active Games"
          value="12"
          icon={<Gamepad2 className="w-5 h-5 text-primary" />}
        />
        <StatsCard
          title="High Risk Bets"
          value="8"
          icon={<AlertTriangle className="w-5 h-5 text-warning" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <BarChart
          data={dailyBetsData}
          title="Daily Total Amount by Game"
          className="xl:col-span-1"
        />
        <PieChart
          data={gameParticipationData}
          title="Game-wise Participation %"
          className="xl:col-span-1"
        />
        <LineChart
          data={profitTrendData}
          title="7-Day Profit Trend"
          className="xl:col-span-1"
        />
      </div>

      {/* Activity and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LiveActivityFeed />
        <NotificationsPanel />
      </div>
    </div>
  );
}
