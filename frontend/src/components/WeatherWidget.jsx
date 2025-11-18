// frontend/src/components/WeatherWidget.jsx
import React from "react";
import useLocation from "../hooks/useLocation";
import useWeather from "../hooks/useWeather";
import { motion } from "framer-motion";

export default function WeatherWidget() {
  const { location, loading: locLoading, error: locError, askForManual } = useLocation();
  const { weather, loading: wLoading, error: wError, refresh } = useWeather(location);

  // Compact loading state
  if (locLoading || wLoading) {
    return (
      <div className="bg-white/6 backdrop-blur-md border border-white/6 p-4 rounded-xl w-full max-w-xs shadow">
        <div className="animate-pulse">
          <div className="h-6 bg-white/8 rounded w-32 mb-2" />
          <div className="h-8 bg-white/8 rounded w-24 mb-2" />
          <div className="h-3 bg-white/6 rounded w-36" />
        </div>
      </div>
    );
  }

  if (locError) {
    return (
      <div className="bg-white/6 backdrop-blur-md border border-white/6 p-4 rounded-xl w-full max-w-xs shadow">
        <div className="text-sm text-gray-300">Location unavailable.</div>
        <div className="text-xs text-gray-400 mt-2">{locError}</div>
        <div className="mt-3">
          <button
            onClick={askForManual}
            className="px-3 py-1 bg-teal-500 rounded text-black text-sm"
          >
            Enter location manually
          </button>
        </div>
      </div>
    );
  }

  if (wError) {
    return (
      <div className="bg-white/6 backdrop-blur-md border border-white/6 p-4 rounded-xl w-full max-w-xs shadow">
        <div className="text-sm text-gray-300">Weather data unavailable.</div>
        <div className="text-xs text-gray-400 mt-2">{wError}</div>
        <div className="mt-3">
          <button onClick={refresh} className="px-3 py-1 bg-teal-500 rounded text-black text-sm">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  const { temp_c, wind_kph, humidity, condition, city } = weather;

  // choose icon
  const icon = (() => {
    const code = (condition || "").toLowerCase();
    if (code.includes("rain") || code.includes("showers")) return "🌧️";
    if (code.includes("cloud")) return "☁️";
    if (code.includes("snow")) return "❄️";
    if (code.includes("thunder")) return "⛈️";
    return "☀️";
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/6 backdrop-blur-md border border-white/6 p-4 rounded-xl w-full max-w-xs shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-300">Weather • {city || "Unknown"}</div>
          <div className="mt-1 text-2xl font-semibold">{Math.round(temp_c)}°C</div>
          <div className="text-xs text-gray-400 mt-1">
            Feels like {Math.round(temp_c)}° • {humidity}% • {Math.round(wind_kph)} km/h
          </div>
        </div>

        <div className="text-4xl ml-3">{icon}</div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="text-xs text-gray-400">{condition || "Clear"}</div>
        <div className="flex gap-2">
          <button
            onClick={refresh}
            className="px-2 py-1 bg-white/10 rounded text-xs text-gray-100"
          >
            Refresh
          </button>
        </div>
      </div>
    </motion.div>
  );
}
