// src/components/Insights.js
import React, { useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { computeCategoryBreakdown, computeMonthlyData } from "../data/mockData";
import anime from "animejs";

export default function Insights() {
  const { state } = useApp();
  const { transactions } = state;
  const cardsRef = useRef(null);

  const categoryData = computeCategoryBreakdown(transactions);
  const monthlyData = computeMonthlyData(transactions);

  const topCategory = categoryData[0];
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  const lastTwo = monthlyData.slice(-2);
  const lastMonth = lastTwo[1];
  const prevMonth = lastTwo[0];
  const expChange = prevMonth && prevMonth.expenses > 0
    ? ((lastMonth?.expenses - prevMonth.expenses) / prevMonth.expenses) * 100
    : 0;

  const avgMonthlyExpense = monthlyData.length > 0
    ? monthlyData.reduce((s, m) => s + m.expenses, 0) / monthlyData.length
    : 0;

  const highestIncomeMonth = [...monthlyData].sort((a, b) => b.income - a.income)[0];

  useEffect(() => {
    if (cardsRef.current) {
      anime({
        targets: cardsRef.current.querySelectorAll(".insight-card"),
        translateY: [30, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, { start: 200 }),
        duration: 600,
        easing: "easeOutBack",
      });
    }
  }, []);

  const insights = [
    {
      icon: "🔥",
      label: "Top Spending Category",
      value: topCategory ? topCategory.name : "—",
      detail: topCategory ? `₹${topCategory.value.toLocaleString("en-IN")} total` : "",
      accent: "#FF5E7A",
      bar: topCategory ? (topCategory.value / totalExpenses) * 100 : 0,
    },
    {
      icon: "📊",
      label: "Savings Rate",
      value: `${savingsRate.toFixed(1)}%`,
      detail: savingsRate >= 20 ? "✅ Healthy savings!" : savingsRate >= 10 ? "⚠️ Could be better" : "❌ Below recommended",
      accent: savingsRate >= 20 ? "#00E87A" : savingsRate >= 10 ? "#FFE66D" : "#FF5E7A",
      bar: Math.min(savingsRate, 100),
    },
    {
      icon: "📅",
      label: "Month-over-Month Expenses",
      value: `${expChange >= 0 ? "+" : ""}${expChange.toFixed(1)}%`,
      detail: lastMonth ? `${lastMonth.month}: ₹${lastMonth.expenses.toLocaleString("en-IN")}` : "—",
      accent: expChange <= 0 ? "#00E87A" : "#FF5E7A",
      bar: Math.min(Math.abs(expChange), 100),
    },
    {
      icon: "💰",
      label: "Best Income Month",
      value: highestIncomeMonth?.month || "—",
      detail: highestIncomeMonth ? `₹${highestIncomeMonth.income.toLocaleString("en-IN")}` : "",
      accent: "#9B8FFF",
      bar: highestIncomeMonth ? (highestIncomeMonth.income / (totalIncome || 1)) * 100 : 0,
    },
    {
      icon: "📉",
      label: "Avg Monthly Expense",
      value: `₹${Math.round(avgMonthlyExpense / 1000)}k`,
      detail: `Over ${monthlyData.length} months`,
      accent: "#60A5FA",
      bar: 60,
    },
    {
      icon: "⚖️",
      label: "Income vs Expense Ratio",
      value: totalExpenses > 0 ? `${(totalIncome / totalExpenses).toFixed(2)}x` : "—",
      detail: totalIncome > totalExpenses ? "✅ Spending within income" : "❌ Overspending",
      accent: totalIncome > totalExpenses ? "#00E87A" : "#FF5E7A",
      bar: totalExpenses > 0 ? Math.min((totalIncome / totalExpenses) * 50, 100) : 50,
    },
  ];

  return (
    <div className="insights-section">
      <div className="section-header">
        <h2>Insights</h2>
        <span className="section-badge">AI-powered analysis</span>
      </div>
      <div className="insights-grid" ref={cardsRef}>
        {insights.map((ins) => (
          <div key={ins.label} className="insight-card" style={{ "--acc": ins.accent }}>
            <div className="insight-icon">{ins.icon}</div>
            <div className="insight-label">{ins.label}</div>
            <div className="insight-value" style={{ color: ins.accent }}>{ins.value}</div>
            <div className="insight-detail">{ins.detail}</div>
            <div className="insight-bar-track">
              <div className="insight-bar-fill" style={{ width: `${ins.bar}%`, background: ins.accent }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
