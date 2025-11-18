// frontend/src/hooks/useWeather.js
import { useEffect, useState, useCallback } from "react";

export default function useWeather(location) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);   // ❗ FIXED (no auto-loading)
  const [error, setError] = useState(null);
  const [tick, setTick] = useState(0);

  const fetchWeather = useCallback(async () => {
    if (!location || !location.latitude) {
      return; // ❗ DO NOT set loading; avoid loops
    }

    setLoading(true);
    setError(null);

    try {
      const { latitude, longitude } = location;

      // 1) Reverse geocode
      const geoRes = await fetch(
        `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
      ).then((r) => r.json()).catch(() => null);

      const city =
        geoRes?.address?.city ||
        geoRes?.address?.town ||
        geoRes?.address?.village ||
        geoRes?.display_name?.split(",")[0] ||
        "Unknown";

      // 2) Open-Meteo Weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m`
      ).then((r) => r.json());

      const cw = weatherRes?.current_weather;

      const weatherObj = cw
        ? {
            temp_c: cw.temperature,
            wind_kph: cw.windspeed,
            humidity: weatherRes?.hourly?.relativehumidity_2m?.[0] ?? 50,
            condition:
              cw.weathercode === 0
                ? "Clear"
                : cw.weathercode <= 3
                ? "Partly Cloudy"
                : "Cloudy",
            city,
          }
        : null;

      setWeather(weatherObj);
    } catch (err) {
      setError("Failed to fetch weather.");
    } finally {
      setLoading(false);
    }
  }, [location, tick]);

  // Run ONLY when location is ready
  useEffect(() => {
    if (location && location.latitude) {
      fetchWeather();
    }
  }, [location, fetchWeather]);

  const refresh = () => setTick((t) => t + 1);

  return { weather, loading, error, refresh };
}
