// src/context/AppContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { INITIAL_TRANSACTIONS } from "../data/mockData";

const AppContext = createContext(null);

const STORAGE_KEY = "finance_dashboard_v1";

const initialState = {
  transactions: INITIAL_TRANSACTIONS,
  role: "viewer", // "viewer" | "admin"
  darkMode: true,
  filters: {
    search: "",
    category: "all",
    type: "all",
    sortBy: "date",
    sortDir: "desc",
  },
  selectedMonth: "all",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ROLE":
      return { ...state, role: action.payload };
    case "TOGGLE_DARK":
      return { ...state, darkMode: !state.darkMode };
    case "SET_FILTER":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case "SET_MONTH":
      return { ...state, selectedMonth: action.payload };
    case "ADD_TRANSACTION":
      const newTxns = [action.payload, ...state.transactions];
      return { ...state, transactions: newTxns };
    case "EDIT_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    case "LOAD_STATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...init, ...parsed };
      }
    } catch (e) {}
    return init;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        transactions: state.transactions,
        role: state.role,
        darkMode: state.darkMode,
      }));
    } catch (e) {}
  }, [state.transactions, state.role, state.darkMode]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

export function useFilteredTransactions() {
  const { state } = useApp();
  const { transactions, filters, selectedMonth } = state;

  let result = [...transactions];

  if (selectedMonth !== "all") {
    result = result.filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() === parseInt(selectedMonth);
    });
  }

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (t) =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }

  if (filters.category !== "all") {
    result = result.filter((t) => t.category === filters.category);
  }

  if (filters.type !== "all") {
    result = result.filter((t) => t.type === filters.type);
  }

  result.sort((a, b) => {
    let valA = a[filters.sortBy];
    let valB = b[filters.sortBy];
    if (filters.sortBy === "date") {
      valA = new Date(valA);
      valB = new Date(valB);
    }
    if (valA < valB) return filters.sortDir === "asc" ? -1 : 1;
    if (valA > valB) return filters.sortDir === "asc" ? 1 : -1;
    return 0;
  });

  return result;
}
