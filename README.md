# FinanceOS — Finance Dashboard

A clean, interactive finance dashboard built with React, GSAP, and Anime.js.

## Tech Stack

| Layer | Library |
|---|---|
| UI | React 18 |
| Charts | Recharts |
| Animations (page/counter) | GSAP 3 |
| Animations (list/stagger) | Anime.js |
| State | React Context + useReducer |
| Persistence | localStorage |
| Styling | Plain CSS with CSS variables |
| Icons/Fonts | Lucide React, Space Mono, DM Sans |

## Features

### Dashboard Overview
- **4 Summary Cards** — Net Balance, Total Income, Total Expenses, Transaction Count
  - Animated number counters powered by GSAP
  - Card entrance animations on mount
- **Balance Trend Chart** — Area chart showing monthly income vs expenses
- **Spending Breakdown** — Donut pie chart by category with legend
- **Monthly Bar Chart** — Side-by-side income vs expense per month

### Transactions
- Full table with Date, Description, Category, Type, Amount
- **Filtering** — search bar + category dropdown + type dropdown
- **Sorting** — click column headers (Date, Amount) to toggle asc/desc
- List entrance animations via Anime.js stagger on filter change

### Role-Based UI
- **Viewer** — Read-only, no add/edit/delete controls shown
- **Admin** — Add transaction button, edit ✎ and delete ✕ per row
- Switch roles via dropdown in the navbar

### Insights
- Highest spending category + share of total
- Savings rate with health indicator
- Month-over-month expense change
- Best income month
- Average monthly expense
- Income vs Expense ratio
- Animated cards on scroll using Anime.js

### UX
- **Dark / Light mode** toggle (persisted)
- **Data persistence** via localStorage
- Empty state for no results
- Fully **responsive** (desktop → tablet → mobile)
- Smooth GSAP entrance animations on every page

## Getting Started

```bash
cd finance-dashboard
npm install
npm start
```

App runs at http://localhost:3000

## Project Structure

```
finance-dashboard/
├── public/
│   └── index.html
└── src/
    ├── App.js              # Root component + tab routing
    ├── App.css             # All styles (CSS variables, dark/light)
    ├── index.js            # React entry point
    ├── context/
    │   └── AppContext.js   # Global state (Context + useReducer)
    ├── data/
    │   └── mockData.js     # 60+ transactions + helpers
    └── components/
        ├── Navbar.js       # Nav + role switcher + dark toggle
        ├── SummaryCards.js # 4 animated metric cards (GSAP)
        ├── Charts.js       # AreaChart, PieChart, BarChart
        ├── Transactions.js # Table + filters + CRUD modal (Anime.js)
        └── Insights.js     # 6 insight cards (Anime.js)
```

## Animation Details

| Animation | Library | Where |
|---|---|---|
| Navbar slide-in | GSAP | On mount |
| Summary card stagger | GSAP | On mount |
| Number counter | GSAP | On value change |
| Chart fade-in | GSAP | On mount (delayed) |
| Transaction row stagger | Anime.js | On filter change |
| Insight card bounce-in | Anime.js | On tab switch |

## Role Demo

1. Default role is **Viewer** — read-only
2. Switch to **Admin** in the top-right dropdown
3. "Add Transaction" button appears, plus Edit/Delete per row

## Data

60+ realistic mock transactions across 6 months (Jan–Jun 2025) with:
- INR amounts
- 10 categories (Food, Transport, Shopping, Entertainment, Healthcare, Utilities, Rent, Salary, Freelance, Investment)
- Income and expense types
