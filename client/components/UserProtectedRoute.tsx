import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface UserProtectedRouteProps {
  children: React.ReactNode;
}

export function UserProtectedRoute({ children }: UserProtectedRouteProps) {
  const { isLoading, isAuthenticated, isUser } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isUser) {
    return <Navigate to="/login?type=user" replace />;
  }

  return <>{children}</>;
}
