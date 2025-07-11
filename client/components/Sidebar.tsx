import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  Settings,
  TrendingUp,
  FileText,
  ChevronDown,
  ChevronRight,
  Gamepad2,
  BarChart3,
  UserCheck,
  Calendar,
  Menu,
  X,
  Globe,
  Download,
  Edit,
  Wallet,
  UserPlus,
  UserMinus,
  Eye,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const gameItems = [
  { name: "Satta Matka", href: "/games/satta-matka" },
  { name: "Color King", href: "/games/color-king" },
  { name: "Roll the Dice", href: "/games/roll-dice" },
  { name: "Lucky Numbers", href: "/games/lucky-numbers" },
  { name: "Card Master", href: "/games/card-master" },
];

const gameManagementItems = [
  { name: "Add Game", href: "/games/management/add" },
  { name: "Update Game Result", href: "/games/management/update-result" },
  { name: "Game Reorder", href: "/games/management/reorder" },
  { name: "Remove Game", href: "/games/management/remove" },
];

const websiteManagementItems = [
  { name: "Content Update", href: "/website/content-update" },
  { name: "Download Links Update", href: "/website/download-links" },
];

const userManagementItems = [
  { name: "View Users & Participation", href: "/user-management/view-users" },
  { name: "Manage Wallet Balances", href: "/user-management/wallet-balances" },
  { name: "Add/Remove Users", href: "/user-management/add-remove" },
];

const navigationItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Games Revenue Analytics",
    icon: Gamepad2,
    children: gameItems,
  },
  {
    title: "Game Management",
    icon: Settings,
    children: gameManagementItems,
  },
  {
    title: "Website Management",
    icon: Globe,
    children: websiteManagementItems,
  },
  {
    title: "User Management",
    icon: UserCheck,
    children: userManagementItems,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem("authToken");
    localStorage.removeItem("userSession");
    sessionStorage.clear();

    // Redirect to login page or home
    window.location.href = "/login";
  };

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title],
    );
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div
      className={cn(
        "bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col h-screen",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-blue rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-sidebar-foreground">
                  BetAdmin
                </h1>
                <p className="text-xs text-sidebar-foreground/60">
                  Gaming Platform
                </p>
              </div>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg hover:bg-sidebar-accent transition-colors"
          >
            {collapsed ? (
              <Menu className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {navigationItems.map((item) => {
          const isExpanded = expandedItems.includes(item.title);
          const hasChildren = !!item.children;
          const active = item.href ? isActive(item.href) : false;

          return (
            <div key={item.title}>
              {hasChildren ? (
                <button
                  onClick={() => !collapsed && toggleExpanded(item.title)}
                  className={cn(
                    "w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors text-left",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    "text-sidebar-foreground",
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="ml-3 flex-1">{item.title}</span>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </>
                  )}
                </button>
              ) : (
                <Link
                  to={item.href!}
                  className={cn(
                    "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    active
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground",
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span className="ml-3">{item.title}</span>}
                </Link>
              )}

              {/* Submenu */}
              {hasChildren && isExpanded && !collapsed && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.children!.map((child) => (
                    <Link
                      key={child.href}
                      to={child.href}
                      className={cn(
                        "block px-3 py-2 text-sm rounded-lg transition-colors",
                        isActive(child.href)
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      )}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-sidebar-primary rounded-full flex items-center justify-center">
              <UserCheck className="w-4 h-4 text-sidebar-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                Admin User
              </p>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                admin@betplatform.com
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 text-left bg-destructive/10 hover:bg-destructive hover:text-destructive-foreground text-destructive border border-destructive/20 hover:border-destructive hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="ml-3 font-semibold">Logout</span>
          </button>
        </div>
      )}

      {/* Collapsed Logout Button */}
      {collapsed && (
        <div className="p-2 border-t border-sidebar-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-2.5 text-sm font-medium rounded-lg transition-all duration-200 bg-destructive/10 hover:bg-destructive hover:text-destructive-foreground text-destructive border border-destructive/20 hover:border-destructive hover:shadow-lg hover:scale-110 active:scale-95"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
