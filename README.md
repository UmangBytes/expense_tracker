# Expense Tracker Application

An Expense Tracker web application that helps users manage their income and expenses efficiently with visual insights. The app includes a dashboard with analytics, dedicated income and expense sections, and secure JWT-based authentication.

---

## Features

### Authentication
- User registration and login
- Secure authentication using JWT (JSON Web Tokens)
- Protected routes for authenticated users only

---

### Dashboard
The dashboard provides a complete overview of the user’s financial activity through 6 main sections:

1. Overview  
   - Summary of total income, total expenses, and available balance

2. Recent Income  
   - Displays the most recent income transactions

3. Last 60 Days Income  
   - Visualized using a bar chart

4. Last 30 Days Expenses  
   - Visualized using charts for expense tracking

5. Income Analytics  
   - Bar chart representation of income data

6. Expense Analytics  
   - Pie chart showing category-wise expense distribution

---

### Income Section
- Add and manage income records
- View all income transactions in a list
- Bar chart visualization for income analysis

---

### Expense Section
- Add and manage expense records
- View all expense transactions in a list
- Line chart visualization to track expense trends over time

---

## Charts and Visualization
- Bar Chart for income analysis
- Pie Chart for expense category distribution
- Line Chart for expense trend analysis

---

## Tech Stack

Frontend
- React
- Chart library (Recharts / Chart.js)
- Tailwind CSS
- Axios

Backend
- Node.js
- Express.js
- JWT Authentication

Database
- MongoDB

---

## JWT Authentication Flow
1. User logs in or registers
2. Server generates a JWT token
3. Token is stored on the client
4. Token is sent with every protected API request
5. Server verifies the token before granting access

---
