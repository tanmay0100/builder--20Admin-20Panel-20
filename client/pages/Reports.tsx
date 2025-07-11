import React from "react";

export function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground">
          Financial reports, profit/loss analysis, and data exports
        </p>
      </div>

      <div className="bg-card rounded-xl shadow-soft border border-border p-8 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Reports Dashboard
        </h3>
        <p className="text-muted-foreground">
          Coming soon - Financial reports, Excel/PDF exports, analytics
        </p>
      </div>
    </div>
  );
}
