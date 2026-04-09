# 🫀 Pulse — The Rhythm of Your Schedule

> An interactive wall calendar component built for the **SWE Frontend Engineering Challenge**.

---

## 📖 Overview

**Pulse** is a polished, fully responsive React calendar component inspired by the physical wall calendar aesthetic. It combines beautiful design with powerful functionality — from live weather forecasts to holiday confetti — all running entirely client-side with no backend required.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 **Auto Month Themes** | Each month has its own unique color palette and glassmorphism UI |
| 📅 **Date Range Selector** | Click start/end dates with hover preview and visual range highlighting |
| ⏰ **Events & Reminders** | Double-click any day to add events with title, time and color tags |
| 🌤️ **Live Weather** | Real weather forecasts via Open-Meteo API (no API key needed) |
| 🎉 **Holiday Confetti** | Click a holiday to trigger animated confetti with a toast notification |
| 📝 **Notes Per Month** | Independent notes for each month, persisted in localStorage |
| 🕐 **IST / GMT Flip Clock** | Live clock with flip animation switching between IST and GMT |
| 🔔 **In-App Reminders** | Toast notifications for events happening today or tomorrow |
| 🔄 **Page Flip Animation** | Smooth animation when navigating between months |
| 💾 **Auto Save** | All data persisted in localStorage — no sign up needed |
| 📱 **Fully Responsive** | Works flawlessly on mobile, tablet and desktop |

---

## 🛠️ Tech Stack

- **React** — Component architecture and state management
- **Tailwind CSS** — Utility-first styling and responsive design
- **Open-Meteo API** — Free weather forecasts, no API key required
- **localStorage** — Client-side data persistence across sessions
- **Canvas API** — Used for holiday confetti animation

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Calendar.jsx        # Main calendar shell
│   ├── CalendarGrid.jsx    # Day grid with flip animation
│   ├── NotesPanel.jsx      # Notes, weather, clock & events panel
│   ├── WeatherWidget.jsx   # Live weather UI
│   ├── ClockCard.jsx       # IST/GMT flip clock
│   ├── EventModal.jsx      # Add/delete events modal
│   ├── Confetti.jsx        # Holiday confetti animation
│   └── LandingPage.jsx     # Landing page with animations
├── hooks/
│   └── useWeather.js       # Weather fetch logic
├── data/
│   └── constants.js        # Month themes, holidays, images
├── App.js
└── index.css
public/
└── images/
    ├── hero-calendar.png   # Hero 3D calendar image
    └── logo.png            # Pulse logo
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or above)
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/JosephMorris7/pulse-calendar.git

# 2. Navigate into the project
cd pulse-calendar

# 3. Install dependencies
npm install

# 4. Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

---

## 🎯 Design Decisions

### Why React over Next.js?
The task specified React/Next.js as options. Since this is a **purely frontend component** with no SSR or routing needs, plain React was the cleaner, simpler choice — faster setup, no unnecessary complexity.

### Why Tailwind CSS?
Tailwind's utility classes make responsive design fast and consistent. Combined with inline styles for dynamic theming (month accent colors), it gives full control over the glassmorphism aesthetic.

### Why Open-Meteo?
It's completely free, requires no API key, and supports date-specific forecasts up to 16 days — perfect for a client-side only app.

### Why localStorage?
The task explicitly said *"client-side solutions like localStorage"* for persistence. All notes, events and date selections survive page refreshes without any backend.

### Month Theming
Each of the 12 months has a unique accent color and gradient background. This gives the calendar a living, breathing feel — January feels icy blue, July feels warm amber, December feels deep purple.

### PULSE Sidebar
The vertical "PULSE" text on the left of the calendar with a typewriter animation adds a unique brand identity that stands out from standard calendar UIs.

---

## 📱 Responsive Design

| Screen | Layout |
|---|---|
| **Mobile** (< 768px) | Stacked vertically — notes above calendar grid |
| **Tablet** (768px+) | Side by side — notes panel left, grid right |
| **Desktop** (1024px+) | Full layout with PULSE sidebar and hero image |

---

## 🌤️ Weather Note

Weather is fetched from **Open-Meteo** for **Hyderabad, India** by default. It only shows for dates **today or within the next 16 days** — past dates and far future dates show a friendly unavailable message.

---

## 📦 Deployment

This project is deployed on **Vercel**:

🔗 [Live Demo](https://your-vercel-link.vercel.app)

To deploy your own:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## 🎥 Video Demo

📹 https://www.youtube.com/watch?v=35lrbQpQHO8

The demo covers:
- Date range selection
- Adding and viewing events
- Notes per month
- Weather widget
- Holiday confetti
- IST/GMT clock flip
- Mobile responsive layout
- Month navigation with theme changes

---

## 👨‍💻 Author

Built with ❤️ by Joseph Morris.

---

> *Pulse — The rhythm of your schedule.*
