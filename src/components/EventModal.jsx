import { useState } from "react";

const EVENT_COLORS = [
  "#f472b6", "#60a5fa", "#86efac", "#fcd34d", "#fb923c", "#a78bfa"
];

export default function EventModal({ date, events, onSave, onDelete, onClose, accent }) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("09:00");
  const [color, setColor] = useState(EVENT_COLORS[0]);

  if (!date) return null;

  const formatted = date.toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric"
  });

  const handleAdd = () => {
    if (!title.trim()) return;
    onSave({ id: Date.now(), title: title.trim(), time, color });
    setTitle("");
    setTime("09:00");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
className="w-full max-w-sm mx-4 rounded-3xl p-6 shadow-2xl border"        style={{
          background: "rgba(10,10,20,0.95)",
          borderColor: `${accent}40`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-xs text-white/30 uppercase tracking-widest">Events</div>
            <div className="text-base font-bold" style={{ color: accent }}>{formatted}</div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white transition"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            ✕
          </button>
        </div>

        {/* Existing Events */}
        <div className="flex flex-col gap-2 mb-5 max-h-40 overflow-y-auto">
          {events.length === 0 && (
            <div className="text-xs text-white/20 italic text-center py-3">No events yet</div>
          )}
          {events.map((ev) => (
            <div
              key={ev.id}
              className="flex items-center justify-between px-3 py-2 rounded-xl"
              style={{ background: `${ev.color}15`, border: `1px solid ${ev.color}30` }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: ev.color }} />
                <span className="text-sm text-white/80">{ev.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/30">{ev.time}</span>
                <button
                  onClick={() => onDelete(ev.id)}
                  className="text-white/20 hover:text-red-400 transition text-xs"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px mb-5" style={{ background: `${accent}20` }} />

        {/* Add Event Form */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Event title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none border"
            style={{
              background: "rgba(255,255,255,0.05)",
              borderColor: `${accent}30`,
            }}
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl text-sm text-white/70 outline-none border"
            style={{
              background: "rgba(255,255,255,0.05)",
              borderColor: `${accent}30`,
            }}
          />

          {/* Color Picker */}
          <div className="flex gap-2">
            {EVENT_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className="w-6 h-6 rounded-full transition-all hover:scale-110"
                style={{
                  background: c,
                  border: color === c ? "2px solid white" : "2px solid transparent",
                  transform: color === c ? "scale(1.2)" : "scale(1)",
                }}
              />
            ))}
          </div>

          <button
            onClick={handleAdd}
            className="w-full py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95"
            style={{ background: accent, color: "#000" }}
          >
            + Add Event
          </button>
        </div>
      </div>
    </div>
  );
}