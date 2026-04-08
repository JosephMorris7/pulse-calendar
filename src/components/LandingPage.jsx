import { useState, useEffect, useRef } from "react";

const TYPEWRITER_WORDS = [
  "Plan Your Days.",
  "Track Your Events.",
  "Own Your Time.",
  "Stay Organised.",
];

const FEATURES = [
  { emoji: "🎨", title: "Auto Month Themes", desc: "Every month has its own unique color palette and glassmorphism design.", color: "#60a5fa" },
  { emoji: "📅", title: "Date Range Selector", desc: "Click to select start and end dates with smooth hover previews.", color: "#a78bfa" },
  { emoji: "⏰", title: "Events & Reminders", desc: "Double-click any day to add events with time and color tags.", color: "#f472b6" },
  { emoji: "🌤️", title: "Live Weather", desc: "Real weather forecasts for your selected dates up to 16 days ahead.", color: "#67e8f9" },
  { emoji: "🎉", title: "Holiday Confetti", desc: "Click a holiday and watch confetti burst across your screen.", color: "#fcd34d" },
  { emoji: "📝", title: "Notes Per Month", desc: "Write and save notes for each month. Everything persists locally.", color: "#86efac" },
  { emoji: "🕐", title: "Live IST / GMT Clock", desc: "A live clock with flip animation switching between IST and GMT time zones.", color: "#fb923c" },
  { emoji: "🔔", title: "In-App Reminders", desc: "Get toast notifications for events happening today or tomorrow.", color: "#f472b6" },
  { emoji: "💾", title: "Auto Save", desc: "All events, notes and selections are saved to your browser automatically.", color: "#a78bfa" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Open the Calendar",
    desc: "Launch Pulse and land on the current month with a beautiful hero image and your theme.",
    emoji: "🗓️",
    color: "#60a5fa",
  },
  {
    step: "02",
    title: "Select Your Dates",
    desc: "Click a start date then an end date. Hover to preview your range before confirming.",
    emoji: "📅",
    color: "#a78bfa",
  },
  {
    step: "03",
    title: "Add Events",
    desc: "Double-click any day to open the event modal. Add a title, time and pick a color.",
    emoji: "⏰",
    color: "#f472b6",
  },
  {
    step: "04",
    title: "Write Notes",
    desc: "Use the notes panel to jot down memos for the month. Weather shows for your selected date.",
    emoji: "📝",
    color: "#86efac",
  },
];

function useTypewriter(words, speed = 80, pause = 1800) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIndex((c) => c + 1);
        }
      } else {
        setText(current.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setWordIndex((w) => (w + 1) % words.length);
          setCharIndex(0);
        } else {
          setCharIndex((c) => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return text;
}

// Phone mockup component
function PhoneMockup() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const cells = [null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  const highlighted = [14, 15, 16, 17, 18];

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow behind phone */}
      <div
        className="absolute w-64 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, #a78bfa, #60a5fa)" }}
      />

      {/* Phone frame */}
      <div
        className="relative w-56 rounded-[2.5rem] border-4 shadow-2xl overflow-hidden"
        style={{
          background: "rgba(10,10,25,0.95)",
          borderColor: "rgba(255,255,255,0.15)",
          boxShadow: "0 0 60px rgba(96,165,250,0.3), inset 0 0 20px rgba(255,255,255,0.03)",
          height: "480px",
        }}
      >
        {/* Notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 rounded-b-2xl z-10"
          style={{ background: "rgba(0,0,0,0.8)" }}
        />

        {/* Screen content */}
        <div className="p-3 pt-8 h-full flex flex-col">

          {/* Hero image mini */}
          <div className="rounded-2xl overflow-hidden h-24 mb-2 relative flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=400"
              alt="April"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-2 right-2 text-right">
              <div className="text-white/50 text-xs leading-none">2026</div>
              <div className="text-blue-400 font-black text-sm tracking-widest leading-none">APRIL</div>
            </div>
            <div className="absolute bottom-2 left-2 flex gap-1">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                style={{ background: "rgba(96,165,250,0.4)" }}>‹</div>
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                style={{ background: "rgba(96,165,250,0.4)" }}>›</div>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {days.map((d) => (
              <div key={d} className="text-center text-xs font-bold py-0.5"
                style={{ color: d === "Sa" || d === "Su" ? "#60a5fa" : "rgba(255,255,255,0.3)", fontSize: "8px" }}>
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-y-0.5 flex-1">
            {cells.map((day, idx) => {
              if (!day) return <div key={idx} />;
              const isStart = day === 14;
              const isEnd = day === 18;
              const inRange = highlighted.includes(day) && !isStart && !isEnd;
              const isToday = day === 10;
              return (
                <div key={idx}
                  className="flex items-center justify-center text-xs"
                  style={{
                    height: "22px",
                    borderRadius: isStart || isEnd ? "50%" : inRange ? "0" : "50%",
                    background: isStart || isEnd ? "#60a5fa" : inRange ? "rgba(96,165,250,0.2)" : "transparent",
                    color: isStart || isEnd ? "#000" : inRange ? "#60a5fa" : "rgba(255,255,255,0.7)",
                    fontWeight: isStart || isEnd || isToday ? "700" : "400",
                    border: isToday && !isStart && !isEnd ? "1.5px solid #60a5fa" : "none",
                    fontSize: "9px",
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>

          {/* Live clock */}
          <div className="mt-2 rounded-xl p-2 flex-shrink-0"
            style={{ background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.2)" }}>
            <div className="text-xs font-black text-center tabular-nums"
              style={{ color: "#60a5fa", fontSize: "11px" }}>
              🇮🇳 {time.toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </div>
          </div>

          {/* Event pill */}
          <div className="mt-1 rounded-xl p-2 flex items-center gap-2 flex-shrink-0"
            style={{ background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.2)" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
            <div>
              <div className="text-purple-400 font-bold" style={{ fontSize: "9px" }}>Team Standup</div>
              <div className="text-white/30" style={{ fontSize: "8px" }}>Apr 14 · 10:00 AM</div>
            </div>
          </div>
        </div>
      </div>

      {/* Side buttons */}
      <div className="absolute right-0 top-24 w-1 h-8 rounded-l-sm"
        style={{ background: "rgba(255,255,255,0.1)" }} />
      <div className="absolute left-0 top-20 w-1 h-6 rounded-r-sm"
        style={{ background: "rgba(255,255,255,0.1)" }} />
      <div className="absolute left-0 top-28 w-1 h-6 rounded-r-sm"
        style={{ background: "rgba(255,255,255,0.1)" }} />
    </div>
  );
}

export default function LandingPage({ onEnter }) {
  const text = useTypewriter(TYPEWRITER_WORDS);
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const howRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen text-white overflow-x-hidden"
      style={{ background: "linear-gradient(135deg, #050510 0%, #0a0a1f 40%, #0d0820 100%)" }}
    >
      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-2 border-b"
        style={{
          borderColor: "rgba(255,255,255,0.05)",
          background: "rgba(5,5,16,0.85)",
          backdropFilter: "blur(20px)",
          height: "72px",
        }}
      >
        <div className="flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="Pulse Logo"
            className="h-10 w-auto object-contain"
            style={{
              filter: "drop-shadow(0 0 15px rgba(96,165,250,0.6)) brightness(1.3)",
              mixBlendMode: "screen",
            }}
          />
          <div className="text-xs text-white/30 leading-none hidden md:block">The rhythm of your schedule.</div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/40">
          <span onClick={() => scrollTo(featuresRef)} className="hover:text-white cursor-pointer transition">Features</span>
          <span onClick={() => scrollTo(howRef)} className="hover:text-white cursor-pointer transition">How it Works</span>
          <span onClick={() => scrollTo(aboutRef)} className="hover:text-white cursor-pointer transition">About</span>
        </div>
        <button
          onClick={onEnter}
          className="px-5 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105"
          style={{ background: "linear-gradient(135deg, #60a5fa, #a78bfa)" }}
        >
          Open App →
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between px-8 md:px-16 pt-24 pb-16 gap-12 max-w-7xl mx-auto">

        {/* Glow blobs */}
        <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #60a5fa, transparent)" }} />
        <div className="absolute bottom-1/3 right-0 w-72 h-72 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #a78bfa, transparent)" }} />

        {/* Left */}
        <div className="flex-1 flex flex-col items-start gap-6 z-10">
          <div
            className="px-4 py-1.5 rounded-full text-xs font-semibold border"
            style={{ background: "rgba(96,165,250,0.1)", borderColor: "rgba(96,165,250,0.3)", color: "#60a5fa" }}
          >
            ✦ Plan & Schedule Like Never Before
          </div>

          <h1 className="text-5xl md:text-6xl font-black leading-tight">
            Plan &{" "}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)" }}>
              Schedule
            </span>
            <br />
            Like Never Before.
          </h1>

          <div className="text-lg text-white/40 h-7 font-light">
            {text}<span className="animate-pulse text-blue-400">|</span>
          </div>

          <p className="text-white/40 text-sm leading-relaxed max-w-md">
            A stunning interactive wall calendar with live weather, events, holiday confetti,
            auto month themes, and persistent notes — all in your browser.
          </p>

          <button
            onClick={onEnter}
            className="px-8 py-3.5 rounded-2xl text-sm font-bold transition-all hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
              boxShadow: "0 0 30px rgba(96,165,250,0.35)",
            }}
          >
            Open Calendar →
          </button>

          <div className="flex gap-6 md:gap-8 mt-2 flex-wrap">
            {[["9+", "Features"], ["12", "Month Themes"], ["100%", "Client-Side"]].map(([val, label]) => (
              <div key={label} className="flex flex-col">
                <span className="text-2xl font-black text-white">{val}</span>
                <span className="text-xs text-white/30">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Phone Mockup */}
       {/* Right — Hero Image */}
<div className="flex-1 w-full flex items-center justify-center z-10">
  <img
    src="/images/hero-calendar.png"
    alt="Pulse Calendar"
    className="w-full max-w-lg hover:scale-105 transition-all duration-700"
    style={{
      filter: "drop-shadow(0 0 60px rgba(96,165,250,0.35)) drop-shadow(0 0 120px rgba(167,139,250,0.2))",
    }}
  />
</div>
      </section>

      {/* How It Works Section */}
      <section ref={howRef} className="px-8 md:px-16 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-14 fade-in opacity-0 translate-y-8 transition-all duration-700">
          <h2 className="text-3xl md:text-4xl font-black mb-3">
            How it{" "}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #60a5fa, #a78bfa)" }}>
              works.
            </span>
          </h2>
          <p className="text-white/30 text-sm">Get started in seconds. No setup needed.</p>
        </div>
        {/* Phone mockup */}
        <div className="flex justify-center mt-16 fade-in opacity-0 translate-y-8 transition-all duration-700">
          <PhoneMockup />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_IT_WORKS.map((step, i) => (
            <div
              key={i}
              className="fade-in opacity-0 translate-y-8 transition-all duration-700 relative"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Connector line */}
              {i < HOW_IT_WORKS.length - 1 && (
                <div
                  className="hidden lg:block absolute top-8 left-full w-full h-px z-0"
                  style={{ background: `linear-gradient(to right, ${step.color}40, transparent)` }}
                />
              )}

              <div
                className="relative z-10 rounded-2xl p-6 border h-full"
                style={{
                  background: `${step.color}08`,
                  borderColor: `${step.color}20`,
                }}
              >
                {/* Step number */}
                <div
                  className="text-4xl font-black mb-3 opacity-20"
                  style={{ color: step.color }}
                >
                  {step.step}
                </div>

                <div className="text-3xl mb-3">{step.emoji}</div>

                <h3
                  className="text-sm font-bold mb-2"
                  style={{ color: step.color }}
                >
                  {step.title}
                </h3>

                <p className="text-xs text-white/35 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="px-8 md:px-16 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-14 fade-in opacity-0 translate-y-8 transition-all duration-700">
          <h2 className="text-3xl md:text-4xl font-black mb-3">
            Packed with{" "}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #60a5fa, #a78bfa)" }}>
              powerful features.
            </span>
          </h2>
          <p className="text-white/30 text-sm">Built with React & Tailwind CSS. No backend needed.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="fade-in opacity-0 translate-y-8 transition-all duration-700 rounded-2xl p-6 border cursor-default"
              style={{
                transitionDelay: `${i * 80}ms`,
                background: "rgba(255,255,255,0.02)",
                borderColor: "rgba(255,255,255,0.06)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${f.color}12`;
                e.currentTarget.style.borderColor = `${f.color}40`;
                e.currentTarget.style.boxShadow = `0 0 30px ${f.color}20`;
                e.currentTarget.style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <div className="text-3xl mb-3">{f.emoji}</div>
              <h3 className="text-sm font-bold mb-1" style={{ color: f.color }}>{f.title}</h3>
              <p className="text-xs text-white/35 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="px-8 md:px-16 py-24 max-w-7xl mx-auto">
        <div
          className="fade-in opacity-0 translate-y-8 transition-all duration-700 rounded-3xl p-10 md:p-16 border flex flex-col md:flex-row gap-10 items-center"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="flex-1">
            <div
              className="text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4"
              style={{ background: "rgba(96,165,250,0.1)", color: "#60a5fa", border: "1px solid rgba(96,165,250,0.3)" }}
            >
              About Pulse
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
              Built to feel like{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #60a5fa, #f472b6)" }}>
                a real calendar.
              </span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-4">
              Pulse is a beautifully designed calendar built for modern productivity.
From managing events to tracking daily tasks, Pulse helps you stay organized and in control of your time.

With dynamic themes, live weather updates, and persistent notes, Pulse transforms a simple calendar into a powerful daily planning tool.
            </p>
            <p className="text-white/40 text-sm leading-relaxed">
              No backend. No database. No sign up. Just open it and start planning. Your data
              lives in your browser, private and persistent.
            </p>
          </div>

          <div className="flex-1 flex flex-col gap-3 w-full">
            <div className="text-xs text-white/30 uppercase tracking-widest mb-1">Tech Stack</div>
            {[
              { name: "React", desc: "Component architecture & state management", color: "#60a5fa" },
              { name: "Tailwind CSS", desc: "Utility-first styling & responsive design", color: "#a78bfa" },
              { name: "Open-Meteo API", desc: "Free weather forecasts, no API key needed", color: "#67e8f9" },
              { name: "localStorage", desc: "Client-side data persistence across sessions", color: "#86efac" },
            ].map((t) => (
              <div key={t.name} className="flex items-center gap-3 p-3 rounded-xl border"
                style={{ background: `${t.color}08`, borderColor: `${t.color}20` }}>
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: t.color }} />
                <div>
                  <div className="text-sm font-bold" style={{ color: t.color }}>{t.name}</div>
                  <div className="text-xs text-white/30">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="text-center py-24 px-4 fade-in opacity-0 translate-y-8 transition-all duration-700">
        <h2 className="text-3xl md:text-4xl font-black mb-3">Feel the rhythm.</h2>
        <p className="text-white/30 text-sm mb-8">No sign up. No backend. Just open and start planning.</p>
        <button
          onClick={onEnter}
          className="px-10 py-4 rounded-2xl text-base font-bold transition-all hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
            boxShadow: "0 0 40px rgba(96,165,250,0.3)",
          }}
        >
          Open Pulse →
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-white/15 text-xs border-t"
        style={{ borderColor: "rgba(255,255,255,0.04)" }}>
        Built with ❤️ by Joseph Morris · Pulse — The rhythm of your schedule.
      </footer>
    </div>
  );
}