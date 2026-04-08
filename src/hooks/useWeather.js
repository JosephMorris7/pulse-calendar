import { useState, useEffect } from "react";

export default function useWeather(date) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  
useEffect(() => {
  if (!date) {
    setWeather(null);
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selected = new Date(date);
  selected.setHours(0, 0, 0, 0);

  // Only fetch for today or future dates (within 16 days)
  const diffDays = Math.ceil((selected - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0 || diffDays > 16) {
    setWeather({ unavailable: true });
    return;
  }

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const lat = 17.3850;
      const lon = 78.4867;
      const formatted = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&start_date=${formatted}&end_date=${formatted}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.daily && data.daily.temperature_2m_max.length > 0) {
        const code = data.daily.weathercode[0];
        const max = Math.round(data.daily.temperature_2m_max[0]);
        const min = Math.round(data.daily.temperature_2m_min[0]);
        setWeather({ max, min, emoji: getWeatherEmoji(code), description: getWeatherDescription(code) });
      }
    } catch (err) {
      console.error("Weather fetch failed:", err);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  fetchWeather();
}, [date]);

  return { weather, loading };
}

function getWeatherEmoji(code) {
  if (code === 0) return "☀️";
  if (code <= 2) return "⛅";
  if (code <= 3) return "☁️";
  if (code <= 49) return "🌫️";
  if (code <= 59) return "🌦️";
  if (code <= 69) return "🌧️";
  if (code <= 79) return "❄️";
  if (code <= 82) return "🌧️";
  if (code <= 84) return "🌨️";
  if (code <= 99) return "⛈️";
  return "🌡️";
}

function getWeatherDescription(code) {
  if (code === 0) return "Clear Sky";
  if (code <= 2) return "Partly Cloudy";
  if (code <= 3) return "Overcast";
  if (code <= 49) return "Foggy";
  if (code <= 59) return "Drizzle";
  if (code <= 69) return "Rainy";
  if (code <= 79) return "Snowy";
  if (code <= 82) return "Heavy Rain";
  if (code <= 84) return "Snow Showers";
  if (code <= 99) return "Thunderstorm";
  return "Unknown";
}