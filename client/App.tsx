import React from "react";
import "./global.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
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
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/games/satta-matka" element={<SattaMatka />} />
        <Route
          path="/games/satta-matka/:marketName"
          element={<SattaMatkaDetails />}
        />
        <Route path="/games/color-king" element={<ColorKing />} />
        <Route path="/games/roll-dice" element={<RollDice />} />
        <Route path="/games/lucky-numbers" element={<LuckyNumbers />} />
        <Route path="/games/card-master" element={<CardMaster />} />
        <Route path="/users" element={<Users />} />
        <Route path="/market" element={<Market />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/games/management/add" element={<AddGame />} />
        <Route
          path="/games/management/update-result"
          element={<UpdateGameResult />}
        />
        <Route path="/games/management/reorder" element={<GameReorder />} />
        <Route path="/games/management/remove" element={<RemoveGame />} />
        <Route path="/website/content-update" element={<ContentUpdate />} />
        <Route path="/website/download-links" element={<DownloadLinks />} />
        <Route path="/user-management/view-users" element={<ViewUsers />} />
        <Route
          path="/user-management/wallet-balances"
          element={<WalletBalances />}
        />
        <Route
          path="/user-management/add-remove"
          element={<AddRemoveUsers />}
        />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

createRoot(document.getElementById("root")!).render(<App />);
