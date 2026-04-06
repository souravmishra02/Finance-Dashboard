// src/components/Charts.js
import React, { useEffect, useRef } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend,
} from "recharts";
import { useApp } from "../context/AppContext";
import { computeMonthlyData, computeCategoryBreakdown } from "../data/mockData";
import { gsap } from "gsap";

const formatINR = (n) =>
  n >= 100000
    ? `₹${(n / 100000).toFixed(1)}L`
    : n >= 1000
    ? `₹${(n / 1000).toFixed(0)}k`
    : `₹${n}`;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="tt-label">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {formatINR(p.value)}
        </p>
      ))}
    </div>
  );
};

const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="chart-tooltip">
      <p style={{ color: d.payload.color }}>{d.name}</p>
      <p>₹{d.value.toLocaleString("en-IN")}</p>
      <p>{d.payload.percent?.toFixed(1)}%</p>
    </div>
  );
};

export function BalanceTrendChart() {
  const { state } = useApp();
  const data = computeMonthlyData(state.transactions);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.3 });
    }
  }, []);

  return (
    <div className="chart-card" ref={ref}>
      <div className="chart-header">
        <h3>Balance Trend</h3>
        <span className="chart-badge trend">Monthly</span>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00E87A" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00E87A" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF5E7A" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FF5E7A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="month" tick={{ fill: "#8892A4", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={formatINR} tick={{ fill: "#8892A4", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="income" stroke="#00E87A" strokeWidth={2} fill="url(#incGrad)" name="Income" />
          <Area type="monotone" dataKey="expenses" stroke="#FF5E7A" strokeWidth={2} fill="url(#expGrad)" name="Expenses" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SpendingPieChart() {
  const { state } = useApp();
  const raw = computeCategoryBreakdown(state.transactions);
  const total = raw.reduce((s, d) => s + d.value, 0);
  const data = raw.slice(0, 7).map((d) => ({ ...d, percent: (d.value / total) * 100 }));
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5 });
    }
  }, []);

  const RADIAN = Math.PI / 180;
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 5) return null;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
        {`${percent.toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="chart-card" ref={ref}>
      <div className="chart-header">
        <h3>Spending Breakdown</h3>
        <span className="chart-badge">By Category</span>
      </div>
      <div className="pie-layout">
        <ResponsiveContainer width="55%" height={220}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={95}
              paddingAngle={3}
              dataKey="value"
              labelLine={false}
              label={renderLabel}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<PieTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pie-legend">
          {data.map((d) => (
            <div key={d.name} className="legend-item">
              <span className="legend-dot" style={{ background: d.color }} />
              <span className="legend-name">{d.name}</span>
              <span className="legend-val">₹{(d.value / 1000).toFixed(0)}k</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MonthlyBarChart() {
  const { state } = useApp();
  const data = computeMonthlyData(state.transactions);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.4 });
    }
  }, []);

  return (
    <div className="chart-card" ref={ref}>
      <div className="chart-header">
        <h3>Monthly Comparison</h3>
        <span className="chart-badge">Income vs Expense</span>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} barGap={4} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="month" tick={{ fill: "#8892A4", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={formatINR} tick={{ fill: "#8892A4", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="income" fill="#00E87A" radius={[4, 4, 0, 0]} name="Income" maxBarSize={28} />
          <Bar dataKey="expenses" fill="#FF5E7A" radius={[4, 4, 0, 0]} name="Expenses" maxBarSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
