import { useState, useEffect } from "react";
import { DAYS, HOLIDAYS } from "../data/constants";

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  let day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}


export default function CalendarGrid({
  currentMonth,
  currentYear,
  startDate,
  endDate,
  onDayClick,
  onHoliday,
  onDayDoubleClick,
  events,
  accent,
}) {
  const [flipping, setFlipping] = useState(false);
  const [displayMonth, setDisplayMonth] = useState(currentMonth);
  const [displayYear, setDisplayYear] = useState(currentYear);
  const [hoveredDate, setHoveredDate] = useState(null);
  const today = new Date();

  useEffect(() => {
    if (currentMonth !== displayMonth || currentYear !== displayYear) {
      setFlipping(true);
      const timeout = setTimeout(() => {
        setDisplayMonth(currentMonth);
        setDisplayYear(currentYear);
        setFlipping(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [currentMonth, currentYear]);

  const daysInMonth = getDaysInMonth(displayYear, displayMonth);
  const firstDay = getFirstDayOfMonth(displayYear, displayMonth);

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isStart = (day) =>
    startDate &&
    startDate.getFullYear() === displayYear &&
    startDate.getMonth() === displayMonth &&
    startDate.getDate() === day;

  const isEnd = (day) =>
    endDate &&
    endDate.getFullYear() === displayYear &&
    endDate.getMonth() === displayMonth &&
    endDate.getDate() === day;

  const isInRange = (day) => {
    const date = new Date(displayYear, displayMonth, day);
    const end = endDate || hoveredDate;
    if (!startDate || !end) return false;
    return date > startDate && date < end;
  };

  const isToday = (day) =>
    today.getFullYear() === displayYear &&
    today.getMonth() === displayMonth &&
    today.getDate() === day;

  const getHoliday = (day) => {
    const key = `${displayMonth + 1}-${day}`;
    return HOLIDAYS[key] || null;
  };

  const handleClick = (day) => {
  const holiday = getHoliday(day);
  if (holiday) onHoliday(holiday);
  onDayClick(day);
};

const handleDoubleClick = (day) => {
  onDayDoubleClick(new Date(displayYear, displayMonth, day));
};
  return (
    <div
className="w-full md:w-2/3 p-4 md:p-6"      style={{
        animation: flipping ? "flipIn 0.3s ease" : "none",
        transformOrigin: "top center",
      }}
    >
      <style>{`
        @keyframes flipIn {
          0%   { opacity: 0; transform: rotateX(-20deg) translateY(-10px); }
          100% { opacity: 1; transform: rotateX(0deg) translateY(0); }
        }
      `}</style>

      {/* Day Headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-bold py-2 tracking-widest uppercase"
            style={{
              color: d === "Sat" || d === "Sun" ? accent : "rgba(255,255,255,0.3)",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day Cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, idx) => {
  if (!day) return <div key={idx} />;

  const holiday = getHoliday(day);
  const start = isStart(day);
  const end = isEnd(day);
  const inRange = isInRange(day);
  const todayMark = isToday(day);
  const dayKey = `${displayYear}-${displayMonth + 1}-${day}`;
  const dayEvents = events?.[dayKey] || [];

  return (
    <div
      key={idx}
      onClick={() => handleClick(day)}
      onDoubleClick={() => handleDoubleClick(day)}
      onMouseEnter={() =>
        startDate &&
        !endDate &&
        setHoveredDate(new Date(displayYear, displayMonth, day))
      }
      onMouseLeave={() => setHoveredDate(null)}
className="relative flex flex-col items-center justify-center h-8 md:h-10 cursor-pointer text-xs md:text-sm transition-all duration-150 select-none group"      style={{
        borderRadius: start || end ? "50%" : inRange ? "0" : "50%",
        background:
          start || end
            ? accent
            : inRange
            ? `${accent}25`
            : "transparent",
        color:
          start || end
            ? "#000"
            : inRange
            ? accent
            : "rgba(255,255,255,0.8)",
        fontWeight: start || end || todayMark ? "700" : "400",
        border:
          todayMark && !start && !end
            ? `2px solid ${accent}`
            : "2px solid transparent",
      }}
      title={holiday ? `${holiday.emoji} ${holiday.name}` : ""}
    >
      {/* Hover glow */}
      {!start && !end && (
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          style={{ background: `${accent}20` }}
        />
      )}

      <span className="relative z-10">{day}</span>

      {/* Event dots */}
      {dayEvents.length > 0 && (
        <div className="absolute bottom-0.5 flex gap-0.5">
          {dayEvents.slice(0, 3).map((ev) => (
            <div
              key={ev.id}
              className="w-1 h-1 rounded-full"
              style={{ background: start || end ? "#000" : ev.color }}
            />
          ))}
        </div>
      )}

      {/* Holiday dot */}
      {holiday && dayEvents.length === 0 && (
        <div
          className="absolute bottom-0.5 w-1 h-1 rounded-full"
          style={{ background: start || end ? "#000" : accent }}
        />
      )}
    </div>
  );
})}
         
      </div>

      {/* Legend */}
      <div className="mt-5 flex flex-wrap gap-4 text-xs text-white/30">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full inline-block" style={{ background: accent }} />
          Start / End
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded inline-block" style={{ background: `${accent}30` }} />
          In Range
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full border-2 inline-block" style={{ borderColor: accent }} />
          Today
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: accent }} />
          Holiday
        </span>
      </div>
    </div>
  );
}