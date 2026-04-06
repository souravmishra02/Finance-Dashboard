// src/components/SummaryCards.js
import React, { useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { gsap } from "gsap";

const formatINR = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

function AnimatedNumber({ value, prefix = "" }) {
  const ref = useRef(null);
  const prev = useRef(0);

  useEffect(() => {
    const obj = { val: prev.current };
    gsap.to(obj, {
      val: value,
      duration: 1.2,
      ease: "power3.out",
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = formatINR(Math.round(obj.val));
        }
      },
    });
    prev.current = value;
  }, [value]);

  return <span ref={ref}>{formatINR(value)}</span>;
}

export default function SummaryCards() {
  const { state } = useApp();
  const { transactions } = state;
  const cardsRef = useRef([]);

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  const months = [...new Set(transactions.map((t) => t.date.slice(0, 7)))].sort();
  const lastMonth = months[months.length - 1];
  const prevMonth = months[months.length - 2];
  const lastMonthExpenses = transactions.filter((t) => t.type === "expense" && t.date.startsWith(lastMonth)).reduce((s, t) => s + t.amount, 0);
  const prevMonthExpenses = transactions.filter((t) => t.type === "expense" && t.date.startsWith(prevMonth || "")).reduce((s, t) => s + t.amount, 0);
  const expenseChange = prevMonthExpenses ? ((lastMonthExpenses - prevMonthExpenses) / prevMonthExpenses) * 100 : 0;

  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out" }
    );
  }, []);

  const cards = [
    {
      label: "Net Balance",
      value: balance,
      icon: "◈",
      accent: "#00FFC8",
      sub: `Savings rate: ${savingsRate.toFixed(1)}%`,
      positive: balance >= 0,
    },
    {
      label: "Total Income",
      value: totalIncome,
      icon: "↑",
      accent: "#00E87A",
      sub: `${transactions.filter((t) => t.type === "income").length} transactions`,
      positive: true,
    },
    {
      label: "Total Expenses",
      value: totalExpenses,
      icon: "↓",
      accent: "#FF5E7A",
      sub: `${expenseChange >= 0 ? "+" : ""}${expenseChange.toFixed(1)}% vs last month`,
      positive: expenseChange <= 0,
    },
    {
      label: "Transactions",
      value: null,
      displayVal: transactions.length,
      icon: "⊞",
      accent: "#9B8FFF",
      sub: `Across ${months.length} months`,
      positive: true,
    },
  ];

  return (
    <div className="summary-cards">
      {cards.map((card, i) => (
        <div
          key={card.label}
          className="card"
          ref={(el) => (cardsRef.current[i] = el)}
          style={{ "--accent": card.accent }}
        >
          <div className="card-header">
            <span className="card-label">{card.label}</span>
            <span className="card-icon" style={{ color: card.accent }}>{card.icon}</span>
          </div>
          <div className="card-value">
            {card.value !== null ? (
              <AnimatedNumber value={card.value} />
            ) : (
              <span className="card-count">{card.displayVal}</span>
            )}
          </div>
          <div className={`card-sub ${card.positive ? "positive" : "negative"}`}>
            {card.sub}
          </div>
          <div className="card-glow" style={{ background: card.accent }} />
        </div>
      ))}
    </div>
  );
}
