// src/App.js
import React, { useState, useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./components/Navbar";
import SummaryCards from "./components/SummaryCards";
import { BalanceTrendChart, SpendingPieChart, MonthlyBarChart } from "./components/Charts";
import Transactions from "./components/Transactions";
import Insights from "./components/Insights";
import "./App.css";

function Dashboard() {
  return (
    <div className="dashboard-grid">
      <SummaryCards />
      <div className="charts-row">
        <BalanceTrendChart />
        <SpendingPieChart />
      </div>
      <MonthlyBarChart />
    </div>
  );
}

function AppInner() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState("Dashboard");

  useEffect(() => {
    document.body.classList.toggle("light", !state.darkMode);
  }, [state.darkMode]);

  return (
    <div className={`app ${state.darkMode ? "dark" : "light"}`}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {activeTab === "Dashboard" && <Dashboard />}
        {activeTab === "Transactions" && <Transactions />}
        {activeTab === "Insights" && <Insights />}
      </main>
      <footer className="footer">
        <span>FinanceOS · {state.role === "admin" ? "⚙️ Admin Mode" : "👁 Viewer Mode"}</span>
        <span>Data persisted locally</span>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
