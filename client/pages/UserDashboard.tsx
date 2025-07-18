import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Wallet,
  Menu,
  Home,
  Gamepad2,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Target,
  Settings,
  HelpCircle,
  LogOut,
  Zap,
  MessageCircle,
  Send,
  PlayCircle,
  Star,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const walletBalance = 2500; // Demo wallet balance

  const gameResults = [
    {
      name: "SRIDEVI",
      badge: "OPEN",
      result: "128-37-156",
      time: "01:15 PM",
      status: "completed",
    },
    {
      name: "DISAWAR",
      badge: "LIVE",
      result: "***-**-***",
      time: "05:00 AM",
      status: "live",
    },
    {
      name: "FARIDABAD",
      badge: "CLOSE",
      result: "247-34-689",
      time: "06:00 PM",
      status: "completed",
    },
    {
      name: "GHAZIABAD",
      badge: "UPCOMING",
      result: "***-**-***",
      time: "08:00 PM",
      status: "upcoming",
    },
  ];

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Gamepad2, label: "Play Games", href: "/user/games" },
    { icon: TrendingUp, label: "Game Results", href: "/user/results" },
    { icon: DollarSign, label: "Game Rates", href: "/user/rates" },
    { icon: ShoppingBag, label: "My Orders", href: "/user/orders" },
    { icon: Target, label: "My Bid", href: "/user/bids" },
    { icon: Wallet, label: "My Wallet", href: "/user/wallet" },
    { icon: HelpCircle, label: "How to Play", href: "/user/help" },
    { icon: Settings, label: "Settings", href: "/user/settings" },
  ];

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-800 shadow-lg sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Profile Icon & Wallet Balance */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                <User className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Wallet className="w-5 h-5 text-yellow-300" />
                <span className="text-white font-bold">
                  ₹{walletBalance.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Center: Logo/Title */}
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-widest">
                :::SattaMatka:::
              </h1>
            </div>

            {/* Right: Hamburger Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="py-6 space-y-2">
                  {menuItems.map((item, index) => (
                    <button
                      key={index}
                      className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                  <div className="border-t pt-2 mt-4">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-50 transition-colors text-left text-red-600"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Welcome Message */}
        <Card className="bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Hey {user?.name}
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-4">
              Welcome to the World's Biggest Matka Game Website
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
              <span className="text-white font-bold">User ID: {user?.id}</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Play Games */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <PlayCircle className="w-6 h-6 text-green-600" />
              Quick Play Games
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 text-white font-bold transition-all duration-300">
              <Target className="w-5 h-5 mr-2" />
              Satta Matka
            </Button>
            <Button className="w-full h-12 bg-green-600 hover:bg-green-700 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 text-white font-bold transition-all duration-300">
              <Star className="w-5 h-5 mr-2" />
              Jodi Games
            </Button>
            <Button className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 text-white font-bold transition-all duration-300">
              <Gamepad2 className="w-5 h-5 mr-2" />
              Panna Games
            </Button>
            <Button className="w-full h-12 bg-red-600 hover:bg-red-700 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 text-white font-bold transition-all duration-300">
              <PlayCircle className="w-5 h-5 mr-2" />
              Quick Pick
            </Button>
          </CardContent>
        </Card>

        {/* Live Results - Same as Home Page */}
        <Card className="bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-white text-xl">
              <Zap className="w-6 h-6 text-yellow-300" />
              Live Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-center">
                <h4 className="text-xl font-bold text-foreground mb-2">
                  DISAWAR
                </h4>
                <Badge variant="destructive" className="bg-red-500 mb-2">
                  LIVE
                </Badge>
                <p className="text-2xl font-bold text-red-600 mb-1">
                  ***-**-***
                </p>
                <p className="text-sm text-muted-foreground">
                  Updated: Just now
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Matka Results */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-xl">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Live Matka Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {gameResults.map((game, index) => (
              <div
                key={index}
                className="relative min-h-[120px] bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300"
              >
                {/* Jodi Button - Left */}
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 hover:shadow-lg hover:scale-105 text-white border-orange-500 font-bold transition-all duration-300 rounded-full"
                >
                  Jodi
                </Button>

                {/* Center Content */}
                <div className="text-center px-20">
                  <h4 className="text-xl font-bold text-foreground mb-4">
                    {game.name}
                  </h4>
                  <p className="text-2xl font-bold text-indigo-600 mb-1">
                    {game.result}
                  </p>
                  <p className="text-sm text-muted-foreground">{game.time}</p>
                </div>

                {/* Panna Button - Right */}
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600 hover:shadow-lg hover:scale-105 text-white border-green-500 font-bold transition-all duration-300 rounded-full"
                >
                  Panna
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Community Buttons */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              Join Our Community
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full h-12 bg-green-600 hover:bg-green-700 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 text-white font-bold text-lg transition-all duration-300">
              <MessageCircle className="w-5 h-5 mr-2" />
              Join WhatsApp Group
            </Button>
            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 text-white font-bold text-lg transition-all duration-300">
              <Send className="w-5 h-5 mr-2" />
              Join Telegram Channel
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
