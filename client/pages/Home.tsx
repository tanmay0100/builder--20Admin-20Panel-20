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
    <div className="min-h-screen bg-gradient-light">
      {/* Header */}
      <header className="bg-gradient-satta border-b-4 border-satta-gold shadow-luxury">
        <div className="container max-w-6xl mx-auto px-4 py-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-widest drop-shadow-lg">
            :::SattaMatka:::
          </h1>
          <p className="text-xl md:text-2xl font-medium text-satta-gold-foreground mt-2 drop-shadow-md">
            सबसे तेज़ और भरोसेमंद वेबसाइट
          </p>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Section 1 - Welcome Card */}
        <Card className="bg-gradient-satta border-2 border-satta-gold shadow-luxury">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
              Welcome to SattaMatka Kingdom
            </h2>
            <p className="text-lg md:text-xl text-satta-gold-foreground leading-relaxed drop-shadow-md">
              भारत की सबसे तेज़ और भरोसेमंद सट्टा मटका वेबसाइट पर आपका स्वागत
              है। यहाँ आपको मिलेंगे सबसे सटीक परिणाम, एक्सपर्ट टिप्स, और 24/7
              सपोर्ट। अभी जुड़ें और अपनी किस्मत आजमाएं!
            </p>
          </CardContent>
        </Card>

        {/* Section 2 - Today's Lucky Number */}
        <Card className="bg-gradient-market-open border-2 border-satta-emerald shadow-luxury">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-6 h-6 text-satta-gold" />
              <h3 className="text-2xl font-bold text-white">
                Today's Lucky Number
              </h3>
              <Star className="w-6 h-6 text-satta-gold" />
            </div>
            <div className="flex items-center justify-center gap-4">
              <span className="text-4xl md:text-5xl font-bold text-satta-gold">
                7-8-0
              </span>
              <span className="text-xl md:text-2xl font-semibold text-white">
                Ank (शुभांक)
              </span>
            </div>
            <p className="text-sm text-satta-emerald-foreground mt-2">
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
        <Card className="bg-gradient-blue border-2 border-primary shadow-luxury">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white text-xl">
              <Zap className="w-6 h-6 text-satta-gold" />
              Live Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-light p-4 rounded-lg border-2 border-satta-gold">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-foreground">DISAWAR</h4>
                  <Badge variant="destructive" className="bg-red-500">
                    LIVE
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-satta-royal">
                    ***-**-***
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Updated: Just now
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4 - Game Results */}
        <Card className="border-2 border-satta-gold shadow-luxury">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <TrendingUp className="w-6 h-6 text-satta-gold" />
              Game Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {gameResults.map((game, index) => (
              <div
                key={index}
                className="relative min-h-[120px] bg-gradient-light border-2 border-satta-amber rounded-lg p-4 hover:shadow-luxury transition-all duration-300"
              >
                {/* Jodi Button - Left */}
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-satta-gold hover:bg-satta-amber text-satta-gold-foreground border-satta-gold font-bold"
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
                  <p className="text-2xl font-bold text-satta-royal mb-1">
                    {game.result}
                  </p>
                  <p className="text-sm text-muted-foreground">{game.time}</p>
                </div>

                {/* Panna Button - Right */}
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-satta-emerald hover:bg-satta-emerald/80 text-satta-emerald-foreground border-satta-emerald font-bold"
                >
                  Panna
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Section 5 - Result Timing Information */}
        <Card className="border-2 border-satta-royal shadow-luxury">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Clock className="w-6 h-6 text-satta-royal" />
              Result Timing Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {timingResults.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gradient-light rounded-lg border border-satta-royal/30"
                >
                  <span className="font-semibold text-foreground">
                    {item.market}
                  </span>
                  <span className="text-satta-royal font-medium">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section 6 - Daily Games Zone */}
        <Card className="border-2 border-satta-crimson shadow-luxury">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Users className="w-6 h-6 text-satta-crimson" />
              Daily Games Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full h-12 bg-gradient-satta hover:shadow-luxury border-2 border-satta-gold text-white font-bold">
              <Target className="w-5 h-5 mr-2" />
              Guessing Form
            </Button>
            <Button className="w-full h-12 bg-gradient-market-open hover:shadow-luxury border-2 border-satta-emerald text-white font-bold">
              <FileText className="w-5 h-5 mr-2" />
              Expert Form
            </Button>
            <Button className="w-full h-12 bg-gradient-blue hover:shadow-luxury border-2 border-primary text-white font-bold">
              <MessageSquare className="w-5 h-5 mr-2" />
              Chatting Formula
            </Button>
            <Button className="w-full h-12 bg-gradient-market-closed hover:shadow-luxury border-2 border-satta-crimson text-white font-bold">
              <PlayCircle className="w-5 h-5 mr-2" />
              Free Open to Close
            </Button>
          </CardContent>
        </Card>

        {/* Section 7 - Download App/Play Now */}
        <Card className="border-2 border-satta-gold shadow-luxury">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              जुड़ें हमारे साथ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full h-12 bg-gradient-satta hover:shadow-luxury text-white font-bold text-lg">
              <Download className="w-5 h-5 mr-2" />
              Download App
            </Button>
            <Button className="w-full h-12 bg-gradient-market-open hover:shadow-luxury text-white font-bold text-lg">
              <PlayCircle className="w-5 h-5 mr-2" />
              Play Now
            </Button>
          </CardContent>
        </Card>

        {/* Section 8 - Pana/Chart Zone */}
        <Card className="border-2 border-satta-amber shadow-luxury">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <BarChart3 className="w-6 h-6 text-satta-amber" />
              Chart Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {chartGames.map((chart, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-gradient-light rounded-lg border border-satta-amber/30 hover:shadow-soft transition-all"
              >
                <span className="font-semibold text-foreground">
                  {chart.name}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-satta-amber text-satta-amber hover:bg-satta-amber hover:text-satta-amber-foreground"
                >
                  View Chart
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Section 9 - Contact Experts */}
        <Card className="bg-gradient-market-open border-2 border-satta-emerald shadow-luxury">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              हमारे एक्सपर्ट्स से बात करें
            </h3>
            <Button className="bg-satta-gold hover:bg-satta-amber text-satta-gold-foreground font-bold text-lg px-8 py-3 h-auto">
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </Button>
          </CardContent>
        </Card>

        {/* Section 10 - Exclusive Gaming Zones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 border-satta-gold shadow-luxury hover:shadow-luxury hover:scale-105 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 text-satta-gold mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Game Guessing Zone</h4>
              <p className="text-muted-foreground mb-4">
                एक्सपर्ट टिप्स और गेम गेसिंग के लिए
              </p>
              <Button className="w-full bg-gradient-satta text-white">
                Enter Zone
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-satta-emerald shadow-luxury hover:shadow-luxury hover:scale-105 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-12 h-12 text-satta-emerald mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Jodi Chart Zone</h4>
              <p className="text-muted-foreground mb-4">
                सभी जोड़ी चार्ट्स एक जगह
              </p>
              <Button className="w-full bg-gradient-market-open text-white">
                View Charts
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-satta-crimson shadow-luxury hover:shadow-luxury hover:scale-105 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Calculator className="w-12 h-12 text-satta-crimson mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Panna Chart Zone</h4>
              <p className="text-muted-foreground mb-4">
                सभी पन्ना चार्ट्स देखें
              </p>
              <Button className="w-full bg-gradient-market-closed text-white">
                Explore Panna
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Section 11 - Disclaimer */}
        <Card className="border-2 border-destructive shadow-luxury">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-bold text-destructive mb-3">
                  Important Disclaimer
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• यह वेबसाइट केवल मनोरंजन के उद्देश्य से है</li>
                  <li>• सट्टा खेलना कानूनी रूप से प्रतिबंधित हो सकता है</li>
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
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-satta-gold transition-colors"
          >
            <Users className="w-4 h-4" />
            Admin Access
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-satta border-t-4 border-satta-gold mt-12">
        <div className="container max-w-6xl mx-auto px-4 py-6 text-center">
          <p className="text-white font-medium">
            © 2024 SattaMatka Platform. All rights reserved.
          </p>
          <p className="text-satta-gold-foreground text-sm mt-2">
            सबसे तेज़ और भरोसेमंद वेबसाइट
          </p>
        </div>
      </footer>
    </div>
  );
}
