import React from "react";

export function Market() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Market Management
        </h1>
        <p className="text-muted-foreground">
          Start/Stop markets, enter results, and manage schedules
        </p>
      </div>

      <div className="bg-card rounded-xl shadow-soft border border-border p-8 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Market Management Panel
        </h3>
        <p className="text-muted-foreground">
          Coming soon - Market controls, result entry, scheduling
        </p>
      </div>
    </div>
  );
}
