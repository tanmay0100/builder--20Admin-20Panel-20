import React, { useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, Mail, LogIn, Eye, EyeOff, Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Login() {
  const [searchParams] = useSearchParams();
  const loginType = searchParams.get("type") || "admin";
  const isUserLogin = loginType === "user";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, isLoading, isAuthenticated, isAdmin, isUser } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    if (isAdmin) {
      return <Navigate to="/admin" replace />;
    } else if (isUser) {
      return <Navigate to="/user/dashboard" replace />;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const success = await login(email, password);
    if (success) {
      // Redirect based on user role after successful login
      if (isUserLogin) {
        navigate("/user/dashboard", { replace: true });
      } else {
        navigate("/admin", { replace: true });
      }
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <div
            className={cn(
              "inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-luxury mb-4",
              isUserLogin
                ? "bg-gradient-to-r from-green-600 to-emerald-600"
                : "bg-gradient-blue",
            )}
          >
            <Gamepad2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gradient-gold mb-2">
            {isUserLogin ? "User Portal" : "Super Admin"}
          </h1>
          <p className="text-muted-foreground">
            {isUserLogin
              ? "Access your gaming account"
              : "Access your SattaMatka dashboard"}
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-luxury border-gradient-gold">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              <Lock className="w-6 h-6 text-satta-gold" />
              {isUserLogin ? "User Login" : "Admin Login"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={
                      isUserLogin
                        ? "user@sattamatka.com"
                        : "admin@sattamatka.com"
                    }
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 border-2 focus:border-satta-gold"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="font-semibold">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border-2 focus:border-satta-gold"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className={cn(
                  "w-full h-12 bg-gradient-satta hover:shadow-luxury transition-all duration-300 text-white font-bold text-lg",
                  "hover:scale-[1.02] active:scale-[0.98]",
                )}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Logging in...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn className="w-5 h-5" />
                    Login to Dashboard
                  </div>
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
              <p className="text-sm font-semibold text-muted-foreground mb-2">
                Demo Credentials:
              </p>
              <div className="text-sm space-y-1">
                {isUserLogin ? (
                  <>
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      user@sattamatka.com
                    </p>
                    <p>
                      <span className="font-medium">Password:</span> user123
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      admin@sattamatka.com
                    </p>
                    <p>
                      <span className="font-medium">Password:</span> admin123
                    </p>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Back to Home
            </a>
            <a
              href={`/login?type=${isUserLogin ? "admin" : "user"}`}
              className="text-sm text-green-600 hover:text-green-800 transition-colors"
            >
              {isUserLogin ? "Admin Login" : "User Login"} →
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 SattaMatka Platform. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
