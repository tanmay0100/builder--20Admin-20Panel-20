import React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, Info, CheckCircle, Bell } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "warning" | "info" | "success";
  time: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "High Betting Alert",
    message: "User 'bigplayer99' placed ₹50,000 bet on Satta Matka",
    type: "warning",
    time: "5 mins ago",
  },
  {
    id: "2",
    title: "Market Opening",
    message: "Shridevi market is now open for betting",
    type: "info",
    time: "10 mins ago",
  },
  {
    id: "3",
    title: "Daily Target Achieved",
    message: "Platform reached ₹10L betting volume today",
    type: "success",
    time: "2 hours ago",
  },
];

export function NotificationsPanel() {
  return (
    <div className="bg-card rounded-xl shadow-soft border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            Notifications
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Important alerts and updates
        </p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div
                className={cn(
                  "p-2 rounded-full",
                  notification.type === "warning" && "bg-warning/10",
                  notification.type === "info" && "bg-info/10",
                  notification.type === "success" && "bg-success/10",
                )}
              >
                {notification.type === "warning" && (
                  <AlertTriangle className="w-4 h-4 text-warning" />
                )}
                {notification.type === "info" && (
                  <Info className="w-4 h-4 text-info" />
                )}
                {notification.type === "success" && (
                  <CheckCircle className="w-4 h-4 text-success" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground">
                  {notification.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {notification.time}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button className="text-sm text-primary hover:text-primary/80 font-medium">
            View All Notifications
          </button>
        </div>
      </div>
    </div>
  );
}
