import ClockCard from "./ClockCard";
import WeatherWidget from "./WeatherWidget";


export default function NotesPanel({ notes, onChange, startDate, endDate, accent, events, currentMonth, currentYear }) {

  const formatDateRange = () => {
    if (!startDate) return "No date selected";
    const opts = { month: "short", day: "numeric", year: "numeric" };
    if (!endDate) return startDate.toLocaleDateString("en-US", opts);
    return `${startDate.toLocaleDateString("en-US", opts)} → ${endDate.toLocaleDateString("en-US", opts)}`;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get only current month's future/today events
  const monthEvents = Object.entries(events || {})
    .flatMap(([key, evList]) => {
      const [year, month, day] = key.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      date.setHours(0, 0, 0, 0);

      // Only show current month AND only today or future
      if (month - 1 !== currentMonth || year !== currentYear) return [];
      if (date < today) return [];

      return evList.map((ev) => ({ ...ev, date, dateKey: key }));
    })
    .sort((a, b) => a.date - b.date);

  const formatEventDate = (date) => {
    const diff = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div
     className="w-full md:w-1/3 p-5 flex flex-col gap-4 border-b md:border-b-0 md:border-r overflow-y-auto"
style={{ borderColor: `${accent}20`, maxHeight: "380px" }}
    >
      {/* Notes Header */}
      <div>
        <h3
          className="text-xs font-bold uppercase tracking-widest mb-1"
          style={{ color: accent }}
        >
          Notes
        </h3>
        <p className="text-xs text-white/40">{formatDateRange()}</p>
      </div>

      {/* Weather Widget */}
      <WeatherWidget date={startDate} accent={accent} />

      {/* Divider */}
      {/* Clock Card */}
<ClockCard accent={accent} />

{/* Divider */}
<div className="h-px w-full" style={{ background: `${accent}20` }} />
      {/* Notes Textarea */}
      <textarea
        className="w-full min-h-24 text-sm resize-none outline-none bg-transparent text-white/70 placeholder-white/20 leading-7"
        placeholder="✍️ Write your notes here..."
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        style={{
          backgroundImage: `repeating-linear-gradient(transparent, transparent 27px, ${accent}15 27px, ${accent}15 28px)`,
        }}
      />

      <div className="text-xs text-white/20 text-right">{notes.length} characters</div>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: `${accent}20` }} />

      {/* Events Section */}
      <div>
        <h3
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: accent }}
        >
          📅 Upcoming Events
        </h3>

        {monthEvents.length === 0 ? (
          <div className="text-xs text-white/20 italic text-center py-4">
            No upcoming events this month.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {monthEvents.map((ev) => (
              <div
                key={ev.id}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border"
                style={{
                  background: `${ev.color}12`,
                  borderColor: `${ev.color}30`,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: ev.color }}
                />
                <div className="flex-1 min-w-0">
                  <div
                    className="text-xs font-bold truncate"
                    style={{ color: ev.color }}
                  >
                    {ev.title}
                  </div>
                  <div className="text-xs text-white/30">
                    {formatEventDate(ev.date)} · {ev.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}