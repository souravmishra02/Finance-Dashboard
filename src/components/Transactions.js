// src/components/Transactions.js
import React, { useEffect, useRef, useState } from "react";
import { useApp, useFilteredTransactions } from "../context/AppContext";
import { CATEGORIES, CATEGORY_COLORS, CATEGORY_ICONS } from "../data/mockData";
import anime from "animejs";

let txnIdCounter = 1000;

export default function Transactions() {
  const { state, dispatch } = useApp();
  const { filters, role } = state;
  const txns = useFilteredTransactions();
  const listRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [editTxn, setEditTxn] = useState(null);
  const [form, setForm] = useState({
    description: "",
    category: CATEGORIES[0],
    amount: "",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (listRef.current) {
      anime({
        targets: listRef.current.querySelectorAll(".txn-row"),
        translateX: [-20, 0],
        opacity: [0, 1],
        delay: anime.stagger(40),
        duration: 400,
        easing: "easeOutQuad",
      });
    }
  }, [txns.length, filters]);

  const handleFilter = (key, val) => dispatch({ type: "SET_FILTER", payload: { [key]: val } });

  const toggleSort = (key) => {
    if (filters.sortBy === key) {
      handleFilter("sortDir", filters.sortDir === "asc" ? "desc" : "asc");
    } else {
      dispatch({ type: "SET_FILTER", payload: { sortBy: key, sortDir: "desc" } });
    }
  };

  const openAdd = () => {
    setEditTxn(null);
    setForm({ description: "", category: CATEGORIES[0], amount: "", type: "expense", date: new Date().toISOString().split("T")[0] });
    setShowForm(true);
  };

  const openEdit = (t) => {
    setEditTxn(t);
    setForm({ description: t.description, category: t.category, amount: t.amount, type: t.type, date: t.date });
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!form.description || !form.amount) return;
    const payload = {
      ...form,
      amount: parseFloat(form.amount),
      id: editTxn ? editTxn.id : `txn-${Date.now()}-${txnIdCounter++}`,
    };
    dispatch({ type: editTxn ? "EDIT_TRANSACTION" : "ADD_TRANSACTION", payload });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  const SortArrow = ({ col }) => (
    <span className={`sort-arrow ${filters.sortBy === col ? "active" : ""}`}>
      {filters.sortBy === col ? (filters.sortDir === "asc" ? " ↑" : " ↓") : " ↕"}
    </span>
  );

  return (
    <div className="transactions-section">
      <div className="section-header">
        <h2>Transactions</h2>
        {role === "admin" && (
          <button className="btn-add" onClick={openAdd}>
            + Add Transaction
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <input
          className="filter-input"
          placeholder="🔍  Search transactions..."
          value={filters.search}
          onChange={(e) => handleFilter("search", e.target.value)}
        />
        <select className="filter-select" value={filters.category} onChange={(e) => handleFilter("category", e.target.value)}>
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="filter-select" value={filters.type} onChange={(e) => handleFilter("type", e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Table */}
      <div className="txn-table-wrap">
        {txns.length === 0 ? (
          <div className="empty-state">
            <span>📭</span>
            <p>No transactions found</p>
          </div>
        ) : (
          <table className="txn-table">
            <thead>
              <tr>
                <th onClick={() => toggleSort("date")} className="sortable">Date <SortArrow col="date" /></th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th onClick={() => toggleSort("amount")} className="sortable">Amount <SortArrow col="amount" /></th>
                {role === "admin" && <th>Actions</th>}
              </tr>
            </thead>
            <tbody ref={listRef}>
              {txns.map((t) => (
                <tr key={t.id} className="txn-row">
                  <td className="txn-date">{new Date(t.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                  <td className="txn-desc">{t.description}</td>
                  <td>
                    <span className="cat-badge" style={{ "--cat-color": CATEGORY_COLORS[t.category] || "#888" }}>
                      {CATEGORY_ICONS[t.category]} {t.category}
                    </span>
                  </td>
                  <td>
                    <span className={`type-badge ${t.type}`}>{t.type}</span>
                  </td>
                  <td className={`txn-amount ${t.type}`}>
                    {t.type === "income" ? "+" : "-"}₹{t.amount.toLocaleString("en-IN")}
                  </td>
                  {role === "admin" && (
                    <td className="txn-actions">
                      <button className="btn-edit" onClick={() => openEdit(t)}>✎</button>
                      <button className="btn-del" onClick={() => handleDelete(t.id)}>✕</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="txn-count">{txns.length} transaction{txns.length !== 1 ? "s" : ""}</div>

      {/* Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editTxn ? "Edit Transaction" : "New Transaction"}</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Description</label>
                <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="e.g. Coffee Shop" />
              </div>
              <div className="form-group">
                <label>Amount (₹)</label>
                <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="0" />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Type</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              <div className="form-group full">
                <label>Date</label>
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn-submit" onClick={handleSubmit}>
                {editTxn ? "Save Changes" : "Add Transaction"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
