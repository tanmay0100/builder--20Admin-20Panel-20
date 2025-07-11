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
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/games/satta-matka" element={<SattaMatka />} />
        <Route path="/games/color-king" element={<ColorKing />} />
        <Route path="/games/roll-dice" element={<RollDice />} />
        <Route path="/games/lucky-numbers" element={<LuckyNumbers />} />
        <Route path="/games/card-master" element={<CardMaster />} />
        <Route path="/users" element={<Users />} />
        <Route path="/market" element={<Market />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

createRoot(document.getElementById("root")!).render(<App />);
