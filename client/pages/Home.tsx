import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Zap,
  TrendingUp,
  Download,
  Phone,
  AlertTriangle,
  Target,
  BarChart3,
  MessageSquare,
  Calendar,
  Clock,
  Users,
  PlayCircle,
  FileText,
  Calculator,
  LogIn,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
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

  const timingResults = [
    { market: "SRIDEVI", time: "01:15 PM - 02:15 PM" },
    { market: "DISAWAR", time: "05:00 AM - 06:00 AM" },
    { market: "FARIDABAD", time: "06:00 PM - 07:00 PM" },
    { market: "GHAZIABAD", time: "08:00 PM - 09:00 PM" },
    { market: "GALI", time: "11:45 PM - 12:45 AM" },
  ];

  const chartGames = [
    { name: "SRIDEVI CHART", link: "/charts/sridevi" },
    { name: "DISAWAR CHART", link: "/charts/disawar" },
    { name: "FARIDABAD CHART", link: "/charts/faridabad" },
    { name: "GHAZIABAD CHART", link: "/charts/ghaziabad" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-800 shadow-lg">
        <div className="container max-w-6xl mx-auto px-4 py-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-widest drop-shadow-lg">
            :::SattaMatka:::
          </h1>
          <p className="text-xl md:text-2xl font-medium text-satta-gold-foreground mt-2 drop-shadow-md">
            सबसे तेज़ और भरोसेमंद वेबसाइट
          </p>
        </div>
      </header>

      {/* Login Button Row */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 shadow-sm">
        <div className="container max-w-6xl mx-auto px-4 py-4 text-center">
          <Link to="/login">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 h-auto text-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
              <LogIn className="w-5 h-5 mr-2" />
              Admin Login
            </Button>
          </Link>
        </div>
      </div>

      <main className="container max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Section 1 - Welcome Card */}
        <Card className="bg-white shadow-lg border border-gray-200">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Welcome to SattaMatkaXpert
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              भारत की सबसे ���ेज़ और भरोसेमंद सट्टा मटका वेबसाइट पर आपका स्वागत
              है। यहाँ आपको मिलेंगे सबसे सटीक परिणाम, एक्सपर्ट टिप्स, और 24/7
              सपोर्ट। अभी जुड़ें और अपनी किस्मत आजमाएं!
            </p>
          </CardContent>
        </Card>

        {/* Section 2 - Today's Lucky Number */}
        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-6 h-6 text-yellow-300" />
              <h3 className="text-2xl font-bold text-white">
                Today's Lucky Number
              </h3>
              <Star className="w-6 h-6 text-yellow-300" />
            </div>
            <div className="flex items-center justify-center gap-4">
              <span className="text-4xl md:text-5xl font-bold text-yellow-300">
                7-8-0
              </span>
              <span className="text-xl md:text-2xl font-semibold text-white">
                Ank (शुभांक)
              </span>
            </div>
            <p className="text-sm text-white/80 mt-2">
              {new Date().toLocaleDateString("hi-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </CardContent>
        </Card>

        {/* Section 3 - Live Results */}
        <Card className="bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white text-xl">
              <Zap className="w-6 h-6 text-yellow-300" />
              Live Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-foreground">DISAWAR</h4>
                  <Badge variant="destructive" className="bg-red-500">
                    LIVE
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-red-600">***-**-***</p>
                  <p className="text-sm text-muted-foreground">
                    Updated: Just now
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4 - Game Results */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Game Results
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
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white border-orange-500 font-bold"
                >
                  Jodi
                </Button>

                {/* Center Content */}
                <div className="text-center px-20">
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    {game.name}
                  </h4>
                  <Badge
                    variant={
                      game.status === "live"
                        ? "destructive"
                        : game.status === "completed"
                          ? "default"
                          : "secondary"
                    }
                    className="mb-2"
                  >
                    {game.badge}
                  </Badge>
                  <p className="text-2xl font-bold text-indigo-600 mb-1">
                    {game.result}
                  </p>
                  <p className="text-sm text-muted-foreground">{game.time}</p>
                </div>

                {/* Panna Button - Right */}
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white border-green-500 font-bold"
                >
                  Panna
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Section 5 - Result Timing Information */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Clock className="w-6 h-6 text-purple-600" />
              Result Timing Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {timingResults.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <span className="font-semibold text-foreground">
                    {item.market}
                  </span>
                  <span className="text-purple-600 font-medium">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section 6 - Daily Games Zone */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Users className="w-6 h-6 text-red-600" />
              Daily Games Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 hover:shadow-md text-white font-bold">
              <Target className="w-5 h-5 mr-2" />
              Guessing Form
            </Button>
            <Button className="w-full h-12 bg-green-600 hover:bg-green-700 hover:shadow-md text-white font-bold">
              <FileText className="w-5 h-5 mr-2" />
              Expert Form
            </Button>
            <Button className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 hover:shadow-md text-white font-bold">
              <MessageSquare className="w-5 h-5 mr-2" />
              Chatting Formula
            </Button>
            <Button className="w-full h-12 bg-red-600 hover:bg-red-700 hover:shadow-md text-white font-bold">
              <PlayCircle className="w-5 h-5 mr-2" />
              Free Open to Close
            </Button>
          </CardContent>
        </Card>

        {/* Section 7 - Download App/Play Now */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              जुड़ें हमारे साथ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full h-12 bg-purple-600 hover:bg-purple-700 hover:shadow-md text-white font-bold text-lg">
              <Download className="w-5 h-5 mr-2" />
              Download App
            </Button>
            <Button className="w-full h-12 bg-green-600 hover:bg-green-700 hover:shadow-md text-white font-bold text-lg">
              <PlayCircle className="w-5 h-5 mr-2" />
              Play Now
            </Button>
          </CardContent>
        </Card>

        {/* Section 8 - Pana/Chart Zone */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <BarChart3 className="w-6 h-6 text-orange-600" />
              Chart Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {chartGames.map((chart, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-all"
              >
                <span className="font-semibold text-foreground">
                  {chart.name}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white"
                >
                  View Chart
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Section 9 - Contact Experts */}
        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              हमारे एक्सपर्ट्स से ��ात करें
            </h3>
            <Button className="bg-white hover:bg-gray-100 text-green-600 font-bold text-lg px-8 py-3 h-auto">
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </Button>
          </CardContent>
        </Card>

        {/* Section 10 - Exclusive Gaming Zones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Game Guessing Zone</h4>
              <p className="text-muted-foreground mb-4">
                एक्सपर्ट टिप्स और गेम गेसिंग के लिए
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Enter Zone
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Jodi Chart Zone</h4>
              <p className="text-muted-foreground mb-4">
                सभी जोड़ी च��र्ट्स एक जगह
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                View Charts
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Calculator className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Panna Chart Zone</h4>
              <p className="text-muted-foreground mb-4">
                सभी पन्ना चार्ट्स देखें
              </p>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                Explore Panna
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Section 11 - Disclaimer */}
        <Card className="bg-white shadow-lg border-l-4 border-red-500">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-bold text-destructive mb-3">
                  Important Disclaimer
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• यह वेबसाइट केवल मनोरंजन के उद्देश्य से है</li>
                  <li>• सट��टा खेलना कानूनी रूप से प्रतिबंधित हो सकता है</li>
                  <li>
                    • केवल 18 वर्ष से अधिक उम्र के व्यक्ति ही भाग ले सकते हैं
                  </li>
                  <li>• जिम्मेदारी से खेलें और अपनी सीमा जानें</li>
                  <li>• किसी भी नुकसान के ���िए वेबसाइट जिम्मेदार नहीं होगी</li>
                </ul>
                <p className="mt-4 text-lg font-bold text-destructive">
                  18+ AGE RESTRICTION STRICTLY ENFORCED
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Login Link */}
        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Users className="w-4 h-4" />
            Admin Access
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-600 to-purple-700 mt-12">
        <div className="container max-w-6xl mx-auto px-4 py-6 text-center">
          <p className="text-white font-medium">
            © 2024 SattaMatka Platform. All rights reserved.
          </p>
          <p className="text-white/80 text-sm mt-2">
            सबसे तेज़ और भरोसेमंद वेबसाइट
          </p>
        </div>
      </footer>
    </div>
  );
}
