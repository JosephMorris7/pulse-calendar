import { useState, useEffect } from "react";
import { MONTHS, HERO_IMAGES, MONTH_THEMES } from "../data/constants";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";
import Confetti from "./Confetti";
import EventModal from "./EventModal";

export default function Calendar({ onBack }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [monthData, setMonthData] = useState(() => {
    try {
      const saved = localStorage.getItem("calendarMonthData");
      if (!saved) return {};
      const parsed = JSON.parse(saved);
      Object.keys(parsed).forEach((key) => {
        if (parsed[key].startDate) parsed[key].startDate = new Date(parsed[key].startDate);
        if (parsed[key].endDate) parsed[key].endDate = new Date(parsed[key].endDate);
      });
      return parsed;
    } catch { return {}; }
  });
  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem("calendarEvents");
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const [holiday, setHoliday] = useState(null);
  const [confettiActive, setConfettiActive] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [modalDate, setModalDate] = useState(null);
  const [reminders, setReminders] = useState([]);

  const theme = MONTH_THEMES[currentMonth];
  const monthKey = `${currentYear}-${currentMonth}`;
  const currentData = monthData[monthKey] || { startDate: null, endDate: null, notes: "" };

  useEffect(() => {
    localStorage.setItem("calendarMonthData", JSON.stringify(monthData));
  }, [monthData]);

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    const todayDate = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const toCheck = [
      { date: todayDate, label: "Today" },
      { date: tomorrow, label: "Tomorrow" },
    ];
    const found = [];
    toCheck.forEach(({ date, label }) => {
      const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      const dayEvents = events[key] || [];
      dayEvents.forEach((ev) => found.push({ ...ev, label }));
    });
    setReminders(found);
  }, [events]);

  const updateMonthData = (updates) => {
    setMonthData((prev) => ({
      ...prev,
      [monthKey]: { ...currentData, ...updates },
    }));
  };

  const prevMonth = () => {
    setImgLoaded(false);
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear((y) => y - 1); }
    else setCurrentMonth((m) => m - 1);
  };

  const nextMonth = () => {
    setImgLoaded(false);
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear((y) => y + 1); }
    else setCurrentMonth((m) => m + 1);
  };

  const handleDayClick = (day) => {
    const clicked = new Date(currentYear, currentMonth, day);
    const { startDate, endDate } = currentData;
    if (!startDate || (startDate && endDate)) {
      updateMonthData({ startDate: clicked, endDate: null });
    } else {
      if (clicked < startDate) updateMonthData({ startDate: clicked, endDate: startDate });
      else updateMonthData({ endDate: clicked });
    }
  };

  const handleHoliday = (h) => {
    setHoliday(h);
    setConfettiActive(true);
    setTimeout(() => { setConfettiActive(false); setHoliday(null); }, 4000);
  };

  const handleDayDoubleClick = (date) => setModalDate(date);

  const getEventKey = (date) =>
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  const handleSaveEvent = (event) => {
    const key = getEventKey(modalDate);
    setEvents((prev) => ({ ...prev, [key]: [...(prev[key] || []), event] }));
  };

  const handleDeleteEvent = (eventId) => {
    const key = getEventKey(modalDate);
    setEvents((prev) => ({ ...prev, [key]: (prev[key] || []).filter((e) => e.id !== eventId) }));
  };

  const modalEvents = modalDate ? events[getEventKey(modalDate)] || [] : [];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.bg} flex items-center justify-center p-4 transition-all duration-700`}>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes letterAppear {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          0% { opacity: 0; transform: translateX(40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {/* Confetti */}
      <Confetti active={confettiActive} accent={theme.accent} />

      {/* Event Modal */}
      <EventModal
        date={modalDate}
        events={modalEvents}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        onClose={() => setModalDate(null)}
        accent={theme.accent}
      />

      {/* Holiday Toast */}
      {holiday && (
        <div
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl text-sm font-semibold shadow-2xl backdrop-blur-md border"
          style={{ background: `${theme.accent}20`, borderColor: `${theme.accent}50`, color: theme.accent }}
        >
          {holiday.emoji} {holiday.name}
        </div>
      )}

      {/* Reminder Toasts */}
      {reminders.length > 0 && (
        <div className="fixed top-6 right-6 z-50 flex flex-col gap-2 max-w-xs">
          {reminders.map((rem, i) => (
            <div
              key={rem.id}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-md"
              style={{
                background: `${rem.color}15`,
                borderColor: `${rem.color}40`,
                animation: "slideIn 0.4s ease forwards",
                animationDelay: `${i * 150}ms`,
                opacity: 0,
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: rem.color }} />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold truncate" style={{ color: rem.color }}>
                  {rem.label} · {rem.time}
                </div>
                <div className="text-xs text-white/70 truncate">{rem.title}</div>
              </div>
              <span className="text-base">🔔</span>
              <button
                onClick={() => setReminders((prev) => prev.filter((r) => r.id !== rem.id))}
                className="text-white/30 hover:text-white transition text-xs ml-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Card + PULSE wrapper */}
<div className="flex items-stretch w-full max-w-4xl shadow-2xl rounded-3xl overflow-hidden my-4">
        {/* PULSE vertical label */}
        <div
          className="flex items-center justify-center"
          style={{
  background: "rgba(10,10,20,0.85)",
  borderRight: `1px solid ${theme.accent}30`,
 minWidth: "36px",
maxWidth: "36px",
}}
        >
          <div
className="font-black text-2xl md:text-4xl tracking-widest select-none"  style={{
    writingMode: "vertical-rl",
    transform: "rotate(180deg)",
    color: theme.accent,
    textShadow: `0 0 20px ${theme.accent}, 0 0 50px ${theme.accent}80, 0 0 80px ${theme.accent}40`,
    letterSpacing: "0.4em",
  }}

          >
            {"PULSE".split("").map((letter, i) => (
              <span
                key={`${currentMonth}-${i}`}
                style={{
                  display: "inline-block",
                  opacity: 0,
                  animation: `letterAppear 0.1s ease forwards`,
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* Main Card */}
        <div
          className="flex-1 overflow-hidden backdrop-blur-xl border-t border-r border-b"
          style={{ background: "rgba(10,10,20,0.7)", borderColor: `${theme.accent}25` }}
        >
          {/* Hero Image */}
          <div className="relative h-56 md:h-64 overflow-hidden">
            <img
              src={HERO_IMAGES[currentMonth]}
              alt={MONTHS[currentMonth]}
              onLoad={() => setImgLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-700 ${imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
            <div className="absolute bottom-0 left-0 right-0">
              <svg viewBox="0 0 800 60" className="w-full" preserveAspectRatio="none">
                <path d="M0,60 L0,30 Q200,0 400,30 Q600,60 800,30 L800,60 Z" fill="rgba(10,10,20,0.7)" />
              </svg>
            </div>

            {/* Month label */}
<div className="absolute top-4 right-6 text-right">
  {/* Dark backdrop for readability */}
  <div
    className="px-5 py-3 rounded-2xl backdrop-blur-md border inline-block"
    style={{
      background: "rgba(0,0,0,0.45)",
      borderColor: `${theme.accent}30`,
    }}
  >
    <div
      className="text-2xl font-bold tracking-widest"
      style={{
        color: "rgba(255,255,255,0.9)",
        textShadow: `0 0 20px ${theme.accent}90, 0 2px 8px rgba(0,0,0,0.9)`,
      }}
    >
      {currentYear}
    </div>
    <div
      className="text-5xl font-black tracking-widest uppercase leading-none"
      style={{
        color: theme.accent,
        textShadow: `0 0 30px ${theme.accent}, 0 0 60px ${theme.accent}80, 0 2px 10px rgba(0,0,0,0.9)`,
      }}
    >
      {MONTHS[currentMonth]}
    </div>
  </div>
</div>

            {/* Navigation arrows */}
            <div className="absolute bottom-6 left-6 flex gap-3">
              <button
                onClick={prevMonth}
                className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border text-white text-2xl font-bold transition-all hover:scale-110 active:scale-95"
                style={{ background: `${theme.accent}30`, borderColor: `${theme.accent}60` }}
              >
                ‹
              </button>
              <button
                onClick={nextMonth}
                className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border text-white text-2xl font-bold transition-all hover:scale-110 active:scale-95"
                style={{ background: `${theme.accent}30`, borderColor: `${theme.accent}60` }}
              >
                ›
              </button>
            </div>

            {/* Theme badge */}
            <div
              className="absolute top-5 left-6 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md border"
              style={{ background: `${theme.accent}15`, borderColor: `${theme.accent}40`, color: theme.accent }}
            >
              {theme.name}
            </div>

            {/* Back button */}
            <button
              onClick={onBack}
              className="absolute top-5 left-1/2 -translate-x-1/2 text-xs px-4 py-1.5 rounded-full border text-white/40 hover:text-white transition backdrop-blur-md"
              style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)" }}
            >
              ← Back
            </button>

            {/* Double click hint */}
            <div
              className="absolute bottom-6 right-6 px-4 py-2 rounded-xl backdrop-blur-md border text-xs font-bold tracking-wide"
              style={{
                background: `${theme.accent}20`,
                borderColor: `${theme.accent}40`,
                color: theme.accent,
                textShadow: `0 0 10px ${theme.accent}60`,
              }}
            >
              ✦ Double-click a day to add events
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col md:flex-row">
            <NotesPanel
  notes={currentData.notes}
  onChange={(val) => updateMonthData({ notes: val })}
  startDate={currentData.startDate}
  endDate={currentData.endDate}
  accent={theme.accent}
  events={events}
  currentMonth={currentMonth}
  currentYear={currentYear}
/>
            <CalendarGrid
              currentMonth={currentMonth}
              currentYear={currentYear}
              startDate={currentData.startDate}
              endDate={currentData.endDate}
              onDayClick={handleDayClick}
              onHoliday={handleHoliday}
              onDayDoubleClick={handleDayDoubleClick}
              events={events}
              accent={theme.accent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}