import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: "increase" | "decrease";
  };
  icon: React.ReactNode;
  className?: string;
}

export function StatsCard({
  title,
  value,
  change,
  icon,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-xl p-6 shadow-soft border border-border",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">{icon}</div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
          </div>
        </div>
        {change && (
          <div
            className={cn(
              "flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium",
              change.type === "increase"
                ? "bg-success/10 text-success"
                : "bg-destructive/10 text-destructive",
            )}
          >
            {change.type === "increase" ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{Math.abs(change.value)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
