# 🚗 Drivo – A Real-Time Ride Booking System

**Drivo** is a modern, scalable, real-time ride booking web application built using the **MERN** stack. It supports dynamic fare calculation based on geolocation, live ride tracking via WebSockets, and a secure dual-role (User/Captain) authentication system. The platform is designed to mirror real-world ride services, with a clean, animated UI and robust backend infrastructure.

---

## 📌 Features

### 🔐 Secure Role-Based Authentication
- Dual registration/login system for **Users** and **Captains**
- Passwords are salted and hashed using **bcrypt**
- **JWT-based authentication** stored in **HTTP-only cookies**
- Middleware to protect private and role-specific routes

### 📍 Real-Time Ride Matching with WebSockets
- Built using **Socket.IO** on both frontend and backend
- Live communication between users and captains for:
  - Ride requests
  - Acceptance and rejection
  - Live status updates (accepted, en route, arrived)

### 🗺️ Smart Location Handling with Google Maps API
- Uses `@react-google-maps/api` to embed dynamic maps
- Automatically fetches geolocation coordinates
- Calculates **actual road distance** via Google’s **Distance Matrix API**
- Displays real-time markers for user/captain locations

### 💸 Accurate Dynamic Fare Calculation
- Fare logic based on:
  - Base fare + (Per Km Rate × Distance)
  - Distance pulled from Google Maps API
- Easily extendable for surge pricing, peak hours, etc.

### ⚡ Sleek and Responsive Frontend
- **React 19** with **Vite** ensures fast build and dev speeds
- **Tailwind CSS** for utility-first styling and responsive design
- **GSAP** for professional-grade animations
- **Remix Icons** for modern UI visuals
- **React Router v7** for clean client-side routing

### 👥 Role-Based Dashboards
- Clean separation between:
  - **Users** (request rides, track progress)
  - **Captains** (accept rides, update statuses)
- Custom hooks and logic to manage session-based role rendering

---

## 🛠️ Tech Stack

### 🧩 Frontend
- **React 19** (with concurrent rendering support)
- **Vite** (lightning-fast build tool)
- **Tailwind CSS** (modern styling)
- **React Router v7**
- **GSAP** (GreenSock) for advanced animations
- **Socket.IO Client**
- **@react-google-maps/api**

### ⚙️ Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose ODM**
- **JWT** + **Cookie Parser** for session auth
- **bcrypt** for secure password hashing
- **dotenv** for environment config
- **Express Validator** for backend input sanitization
- **Socket.IO** for WebSocket server
- **CORS** setup for frontend-backend communication

---

## 🔐 JWT Authentication Flow

1. User or Captain registers (password is hashed with `bcrypt` + salt).
2. On login, a **JWT token** is signed and sent via a secure **HTTP-only cookie**.
3. Middleware on protected routes verifies the token, checks role, and authorizes access.

---

## 🔁 Real-Time WebSocket Flow

1. Client connects to WebSocket on login.
2. On ride request, the backend emits to all connected captains.
3. First captain to accept triggers a status update for that user.
4. All changes (on the way, ride started, completed) are broadcast to the user in real-time.

---
