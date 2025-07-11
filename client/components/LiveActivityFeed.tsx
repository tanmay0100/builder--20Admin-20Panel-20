import React from "react";
import { cn } from "@/lib/utils";
import { Clock, User, DollarSign } from "lucide-react";

interface Activity {
  id: string;
  user: string;
  action: string;
  amount: number;
  game: string;
  time: string;
  type: "bet" | "win" | "loss";
}

const mockActivities: Activity[] = [
  {
    id: "1",
    user: "user123",
    action: "placed bet on Single Ank (5)",
    amount: 500,
    game: "Satta Matka - Shridevi",
    time: "2 mins ago",
    type: "bet",
  },
  {
    id: "2",
    user: "player456",
    action: "won on Red Color",
    amount: 1200,
    game: "Color King",
    time: "5 mins ago",
    type: "win",
  },
  {
    id: "3",
    user: "lucky789",
    action: "placed bet on Jodi (25)",
    amount: 300,
    game: "Satta Matka - Milan",
    time: "8 mins ago",
    type: "bet",
  },
  {
    id: "4",
    user: "gamer321",
    action: "placed bet on Dice (6)",
    amount: 750,
    game: "Roll the Dice",
    time: "12 mins ago",
    type: "bet",
  },
];

export function LiveActivityFeed() {
  return (
    <div className="bg-card rounded-xl shadow-soft border border-border">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">
          Live Activity Feed
        </h3>
        <p className="text-sm text-muted-foreground">
          Real-time betting activity across all games
        </p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div
                className={cn(
                  "p-2 rounded-full",
                  activity.type === "bet" && "bg-info/10",
                  activity.type === "win" && "bg-success/10",
                  activity.type === "loss" && "bg-destructive/10",
                )}
              >
                {activity.type === "bet" && (
                  <DollarSign className={cn("w-4 h-4", "text-info")} />
                )}
                {activity.type === "win" && (
                  <DollarSign className={cn("w-4 h-4", "text-success")} />
                )}
                {activity.type === "loss" && (
                  <DollarSign className={cn("w-4 h-4", "text-destructive")} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <User className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    {activity.user}
                  </span>
                </div>
                <p className="text-sm text-foreground mt-1">
                  {activity.action}
                </p>
                <p className="text-xs text-muted-foreground">{activity.game}</p>
                <div className="flex items-center justify-between mt-2">
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      activity.type === "win" && "text-success",
                      activity.type === "bet" && "text-info",
                      activity.type === "loss" && "text-destructive",
                    )}
                  >
                    ₹{activity.amount.toLocaleString()}
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{activity.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button className="text-sm text-primary hover:text-primary/80 font-medium">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}
