// src/components/Navbar.js
import React, { useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { gsap } from "gsap";

export default function Navbar({ activeTab, setActiveTab }) {
  const { state, dispatch } = useApp();
  const { role, darkMode } = state;
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
  }, []);

  const tabs = ["Dashboard", "Transactions", "Insights"];

  return (
    <nav className="navbar" ref={navRef}>
      <div className="nav-logo">
        <span className="logo-icon">◈</span>
        <span className="logo-text">FinanceOS</span>
      </div>

      <div className="nav-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`nav-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="nav-controls">
        <div className="role-switcher">
          <span className="role-label">Role:</span>
          <select
            className="role-select"
            value={role}
            onChange={(e) => dispatch({ type: "SET_ROLE", payload: e.target.value })}
          >
            <option value="viewer">👁 Viewer</option>
            <option value="admin">⚙️ Admin</option>
          </select>
        </div>

        <button
          className="dark-toggle"
          onClick={() => dispatch({ type: "TOGGLE_DARK" })}
          title="Toggle theme"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}
