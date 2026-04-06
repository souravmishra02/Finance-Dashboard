// src/data/mockData.js

export const CATEGORIES = [
  "Food & Dining",
  "Transport",
  "Shopping",
  "Entertainment",
  "Healthcare",
  "Utilities",
  "Rent",
  "Salary",
  "Freelance",
  "Investment",
];

export const CATEGORY_COLORS = {
  "Food & Dining": "#FF6B6B",
  Transport: "#4ECDC4",
  Shopping: "#FFE66D",
  Entertainment: "#A78BFA",
  Healthcare: "#34D399",
  Utilities: "#60A5FA",
  Rent: "#F97316",
  Salary: "#10B981",
  Freelance: "#06B6D4",
  Investment: "#8B5CF6",
};

export const CATEGORY_ICONS = {
  "Food & Dining": "🍜",
  Transport: "🚗",
  Shopping: "🛍️",
  Entertainment: "🎬",
  Healthcare: "💊",
  Utilities: "⚡",
  Rent: "🏠",
  Salary: "💼",
  Freelance: "💻",
  Investment: "📈",
};

let idCounter = 1;
const makeId = () => `txn-${idCounter++}`;

export const INITIAL_TRANSACTIONS = [
  // January
  { id: makeId(), date: "2025-01-03", description: "Monthly Salary", category: "Salary", amount: 85000, type: "income" },
  { id: makeId(), date: "2025-01-05", description: "Swiggy Order", category: "Food & Dining", amount: 480, type: "expense" },
  { id: makeId(), date: "2025-01-07", description: "Uber Ride", category: "Transport", amount: 220, type: "expense" },
  { id: makeId(), date: "2025-01-10", description: "Amazon Shopping", category: "Shopping", amount: 3200, type: "expense" },
  { id: makeId(), date: "2025-01-12", description: "Netflix Subscription", category: "Entertainment", amount: 649, type: "expense" },
  { id: makeId(), date: "2025-01-15", description: "Electricity Bill", category: "Utilities", amount: 1800, type: "expense" },
  { id: makeId(), date: "2025-01-18", description: "Freelance Project", category: "Freelance", amount: 25000, type: "income" },
  { id: makeId(), date: "2025-01-20", description: "House Rent", category: "Rent", amount: 18000, type: "expense" },
  { id: makeId(), date: "2025-01-22", description: "Doctor Visit", category: "Healthcare", amount: 800, type: "expense" },
  { id: makeId(), date: "2025-01-25", description: "Zomato Order", category: "Food & Dining", amount: 350, type: "expense" },
  { id: makeId(), date: "2025-01-28", description: "Mutual Fund SIP", category: "Investment", amount: 5000, type: "expense" },

  // February
  { id: makeId(), date: "2025-02-02", description: "Monthly Salary", category: "Salary", amount: 85000, type: "income" },
  { id: makeId(), date: "2025-02-04", description: "Grocery Store", category: "Food & Dining", amount: 2200, type: "expense" },
  { id: makeId(), date: "2025-02-06", description: "Ola Ride", category: "Transport", amount: 180, type: "expense" },
  { id: makeId(), date: "2025-02-09", description: "Flipkart Order", category: "Shopping", amount: 1800, type: "expense" },
  { id: makeId(), date: "2025-02-11", description: "Movie Tickets", category: "Entertainment", amount: 900, type: "expense" },
  { id: makeId(), date: "2025-02-14", description: "Internet Bill", category: "Utilities", amount: 999, type: "expense" },
  { id: makeId(), date: "2025-02-17", description: "Freelance Design", category: "Freelance", amount: 18000, type: "income" },
  { id: makeId(), date: "2025-02-20", description: "House Rent", category: "Rent", amount: 18000, type: "expense" },
  { id: makeId(), date: "2025-02-23", description: "Pharmacy", category: "Healthcare", amount: 450, type: "expense" },
  { id: makeId(), date: "2025-02-26", description: "Mutual Fund SIP", category: "Investment", amount: 5000, type: "expense" },

  // March
  { id: makeId(), date: "2025-03-03", description: "Monthly Salary", category: "Salary", amount: 85000, type: "income" },
  { id: makeId(), date: "2025-03-05", description: "Restaurant Dinner", category: "Food & Dining", amount: 1800, type: "expense" },
  { id: makeId(), date: "2025-03-07", description: "Metro Card Recharge", category: "Transport", amount: 500, type: "expense" },
  { id: makeId(), date: "2025-03-10", description: "Myntra Shopping", category: "Shopping", amount: 4500, type: "expense" },
  { id: makeId(), date: "2025-03-13", description: "Spotify Premium", category: "Entertainment", amount: 119, type: "expense" },
  { id: makeId(), date: "2025-03-15", description: "Gas Bill", category: "Utilities", amount: 700, type: "expense" },
  { id: makeId(), date: "2025-03-18", description: "Freelance Dev Work", category: "Freelance", amount: 35000, type: "income" },
  { id: makeId(), date: "2025-03-20", description: "House Rent", category: "Rent", amount: 18000, type: "expense" },
  { id: makeId(), date: "2025-03-23", description: "Gym Membership", category: "Healthcare", amount: 2000, type: "expense" },
  { id: makeId(), date: "2025-03-26", description: "Mutual Fund SIP", category: "Investment", amount: 5000, type: "expense" },
  { id: makeId(), date: "2025-03-28", description: "Stock Purchase", category: "Investment", amount: 10000, type: "expense" },

  // April
  { id: makeId(), date: "2025-04-02", description: "Monthly Salary", category: "Salary", amount: 90000, type: "income" },
  { id: makeId(), date: "2025-04-04", description: "Swiggy Order", category: "Food & Dining", amount: 620, type: "expense" },
  { id: makeId(), date: "2025-04-06", description: "Fuel Refill", category: "Transport", amount: 2500, type: "expense" },
  { id: makeId(), date: "2025-04-09", description: "Electronics", category: "Shopping", amount: 12000, type: "expense" },
  { id: makeId(), date: "2025-04-12", description: "Concert Tickets", category: "Entertainment", amount: 2200, type: "expense" },
  { id: makeId(), date: "2025-04-15", description: "Electricity Bill", category: "Utilities", amount: 2100, type: "expense" },
  { id: makeId(), date: "2025-04-17", description: "Bonus", category: "Salary", amount: 15000, type: "income" },
  { id: makeId(), date: "2025-04-20", description: "House Rent", category: "Rent", amount: 18000, type: "expense" },
  { id: makeId(), date: "2025-04-22", description: "Medical Checkup", category: "Healthcare", amount: 1500, type: "expense" },
  { id: makeId(), date: "2025-04-25", description: "Coffee Shop", category: "Food & Dining", amount: 380, type: "expense" },
  { id: makeId(), date: "2025-04-27", description: "Mutual Fund SIP", category: "Investment", amount: 5000, type: "expense" },

  // May
  { id: makeId(), date: "2025-05-02", description: "Monthly Salary", category: "Salary", amount: 90000, type: "income" },
  { id: makeId(), date: "2025-05-05", description: "Restaurant Lunch", category: "Food & Dining", amount: 950, type: "expense" },
  { id: makeId(), date: "2025-05-08", description: "Rapido Ride", category: "Transport", amount: 90, type: "expense" },
  { id: makeId(), date: "2025-05-11", description: "Nykaa Order", category: "Shopping", amount: 2800, type: "expense" },
  { id: makeId(), date: "2025-05-13", description: "Disney+ Hotstar", category: "Entertainment", amount: 299, type: "expense" },
  { id: makeId(), date: "2025-05-16", description: "Water Bill", category: "Utilities", amount: 400, type: "expense" },
  { id: makeId(), date: "2025-05-19", description: "Freelance Content", category: "Freelance", amount: 12000, type: "income" },
  { id: makeId(), date: "2025-05-20", description: "House Rent", category: "Rent", amount: 18000, type: "expense" },
  { id: makeId(), date: "2025-05-24", description: "Dental Visit", category: "Healthcare", amount: 3000, type: "expense" },
  { id: makeId(), date: "2025-05-27", description: "Mutual Fund SIP", category: "Investment", amount: 5000, type: "expense" },

  // June
  { id: makeId(), date: "2025-06-02", description: "Monthly Salary", category: "Salary", amount: 90000, type: "income" },
  { id: makeId(), date: "2025-06-05", description: "Blinkit Groceries", category: "Food & Dining", amount: 1650, type: "expense" },
  { id: makeId(), date: "2025-06-07", description: "Parking Fee", category: "Transport", amount: 150, type: "expense" },
  { id: makeId(), date: "2025-06-10", description: "IKEA Furniture", category: "Shopping", amount: 8500, type: "expense" },
  { id: makeId(), date: "2025-06-12", description: "Gaming Purchase", category: "Entertainment", amount: 1800, type: "expense" },
  { id: makeId(), date: "2025-06-15", description: "Electricity Bill", category: "Utilities", amount: 2400, type: "expense" },
  { id: makeId(), date: "2025-06-17", description: "Freelance Project", category: "Freelance", amount: 42000, type: "income" },
  { id: makeId(), date: "2025-06-20", description: "House Rent", category: "Rent", amount: 18000, type: "expense" },
  { id: makeId(), date: "2025-06-23", description: "Eye Checkup", category: "Healthcare", amount: 1200, type: "expense" },
  { id: makeId(), date: "2025-06-25", description: "Stock Dividend", category: "Investment", amount: 3500, type: "income" },
  { id: makeId(), date: "2025-06-28", description: "Mutual Fund SIP", category: "Investment", amount: 5000, type: "expense" },
];

export const computeMonthlyData = (transactions) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const map = {};
  transactions.forEach((t) => {
    const d = new Date(t.date);
    const key = months[d.getMonth()];
    if (!map[key]) map[key] = { month: key, income: 0, expenses: 0, balance: 0 };
    if (t.type === "income") map[key].income += t.amount;
    else map[key].expenses += t.amount;
  });
  return Object.values(map).map((m) => ({ ...m, balance: m.income - m.expenses }));
};

export const computeCategoryBreakdown = (transactions) => {
  const map = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      if (!map[t.category]) map[t.category] = 0;
      map[t.category] += t.amount;
    });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] || "#888" }))
    .sort((a, b) => b.value - a.value);
};
