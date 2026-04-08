import useWeather from "../hooks/useWeather";

export default function WeatherWidget({ date, accent }) {
  const { weather, loading } = useWeather(date);

  if (!date) return null;

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className="rounded-2xl p-4 flex items-center gap-4 mt-4 backdrop-blur-md border"
      style={{
        background: `rgba(255,255,255,0.05)`,
        borderColor: `${accent}30`,
      }}
    >
      {loading ? (
        <div className="flex items-center gap-3 w-full">
          <div className="w-10 h-10 rounded-full animate-pulse" style={{ background: `${accent}30` }} />
          <div className="flex flex-col gap-1">
            <div className="w-24 h-3 rounded animate-pulse" style={{ background: `${accent}30` }} />
            <div className="w-16 h-3 rounded animate-pulse" style={{ background: `${accent}20` }} />
          </div>
        </div>
        ) : weather?.unavailable ? (
  <div className="text-xs italic text-white/30">🗓️ Weather only available for dates within next 16 days</div>
) : weather ? (
      
        <>
          <div className="text-4xl">{weather.emoji}</div>
          <div className="flex flex-col">
            <span className="text-xs text-white/40 mb-0.5">{formattedDate}</span>
            <span className="text-sm font-semibold" style={{ color: accent }}>
              {weather.description}
            </span>
            <span className="text-xs text-white/60">
              ↑ {weather.max}°C &nbsp; ↓ {weather.min}°C
            </span>
          </div>
        </>
      ) : (
        <div className="text-xs text-white/30 italic">Weather unavailable</div>
      )}
    </div>
  );
}