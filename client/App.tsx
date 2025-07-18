import React from "react";
import "./global.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminLayout } from "@/components/AdminLayout";
import { UserProtectedRoute } from "@/components/UserProtectedRoute";
import { Dashboard } from "./pages/Dashboard";
import { SattaMatka } from "./pages/SattaMatka";
import { SattaMatkaDetails } from "./pages/SattaMatkaDetails";
import { ColorKing } from "./pages/ColorKing";
import { RollDice } from "./pages/RollDice";
import { LuckyNumbers } from "./pages/LuckyNumbers";
import { CardMaster } from "./pages/CardMaster";
import { Users } from "./pages/Users";
import { Market } from "./pages/Market";
import { Reports } from "./pages/Reports";
import { Analytics } from "./pages/Analytics";
import { Settings } from "./pages/Settings";
import { AddGame } from "./pages/AddGame";
import { UpdateGameResult } from "./pages/UpdateGameResult";
import { GameReorder } from "./pages/GameReorder";
import { RemoveGame } from "./pages/RemoveGame";
import { ContentUpdate } from "./pages/ContentUpdate";
import { DownloadLinks } from "./pages/DownloadLinks";
import { ViewUsers } from "./pages/ViewUsers";
import { WalletBalances } from "./pages/WalletBalances";
import { AddRemoveUsers } from "./pages/AddRemoveUsers";
import { AddLuckyNumber } from "./pages/AddLuckyNumber";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* User Dashboard Route */}
        <Route
          path="/user/dashboard"
          element={
            <UserProtectedRoute>
              <UserDashboard />
            </UserProtectedRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/games/satta-matka"
          element={
            <AdminLayout>
              <SattaMatka />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/games/satta-matka/:marketName"
          element={
            <AdminLayout>
              <SattaMatkaDetails />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/games/color-king"
          element={
            <AdminLayout>
              <ColorKing />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/games/roll-dice"
          element={
            <AdminLayout>
              <RollDice />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/games/lucky-numbers"
          element={
            <AdminLayout>
              <LuckyNumbers />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/games/card-master"
          element={
            <AdminLayout>
              <CardMaster />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <Users />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/market"
          element={
            <AdminLayout>
              <Market />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <AdminLayout>
              <Reports />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <AdminLayout>
              <Analytics />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminLayout>
              <Settings />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/lucky-numbers/add"
          element={
            <AdminLayout>
              <AddLuckyNumber />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/games/management/add"
          element={
            <AdminLayout>
              <AddGame />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/games/management/update-result"
          element={
            <AdminLayout>
              <UpdateGameResult />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/games/management/reorder"
          element={
            <AdminLayout>
              <GameReorder />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/games/management/remove"
          element={
            <AdminLayout>
              <RemoveGame />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/website/content-update"
          element={
            <AdminLayout>
              <ContentUpdate />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/website/download-links"
          element={
            <AdminLayout>
              <DownloadLinks />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/user-management/view-users"
          element={
            <AdminLayout>
              <ViewUsers />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/user-management/wallet-balances"
          element={
            <AdminLayout>
              <WalletBalances />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/user-management/add-remove"
          element={
            <AdminLayout>
              <AddRemoveUsers />
            </AdminLayout>
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

createRoot(document.getElementById("root")!).render(<App />);
