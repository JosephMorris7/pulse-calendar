import { useState, useEffect } from "react";

export default function ClockCard({ accent }) {
  const [time, setTime] = useState(new Date());
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date, timeZone) => {
    return date.toLocaleTimeString("en-US", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date, timeZone) => {
    return date.toLocaleDateString("en-US", {
      timeZone,
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const istTime = formatTime(time, "Asia/Kolkata");
  const gmtTime = formatTime(time, "Europe/London");
  const istDate = formatDate(time, "Asia/Kolkata");
  const gmtDate = formatDate(time, "Europe/London");

  return (
    <div
      className="w-full cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped((f) => !f)}
      title="Click to flip"
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100px",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >

        {/* FRONT — IST */}
        <div
          className="absolute inset-0 rounded-2xl p-4 flex flex-col justify-between border"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: `${accent}12`,
            borderColor: `${accent}30`,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🇮🇳</span>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: accent }}
              >
                IST
              </span>
            </div>
            <div className="text-xs text-white/25 italic">flip for GMT →</div>
          </div>
          <div>
            <div
              className="text-2xl font-black tracking-widest tabular-nums"
              style={{
                color: accent,
                textShadow: `0 0 20px ${accent}60`,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {istTime}
            </div>
            <div className="text-xs text-white/30 mt-0.5">{istDate}</div>
          </div>
        </div>

        {/* BACK — GMT */}
        <div
          className="absolute inset-0 rounded-2xl p-4 flex flex-col justify-between border"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "rgba(134,239,172,0.08)",
            borderColor: "rgba(134,239,172,0.3)",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🌍</span>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#86efac" }}
              >
                GMT
              </span>
            </div>
            <div className="text-xs text-white/25 italic">← flip for IST</div>
          </div>
          <div>
            <div
              className="text-2xl font-black tracking-widest tabular-nums"
              style={{
                color: "#86efac",
                textShadow: "0 0 20px rgba(134,239,172,0.6)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {gmtTime}
            </div>
            <div className="text-xs text-white/30 mt-0.5">{gmtDate}</div>
          </div>
        </div>

      </div>
    </div>
  );
}