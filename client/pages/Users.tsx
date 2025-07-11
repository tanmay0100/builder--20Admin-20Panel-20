import React from "react";

export function Users() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">User Management</h1>
        <p className="text-muted-foreground">
          Manage users, view betting history, and monitor activities
        </p>
      </div>

      <div className="bg-card rounded-xl shadow-soft border border-border p-8 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          User Management Panel
        </h3>
        <p className="text-muted-foreground">
          Coming soon - User search, betting history, wallet management
        </p>
      </div>
    </div>
  );
}
