import React from "react";

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Platform settings, configurations, and preferences
        </p>
      </div>

      <div className="bg-card rounded-xl shadow-soft border border-border p-8 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Settings Panel
        </h3>
        <p className="text-muted-foreground">
          Coming soon - Platform configuration, user settings, system
          preferences
        </p>
      </div>
    </div>
  );
}
