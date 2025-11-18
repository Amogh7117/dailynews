// frontend/src/hooks/useLocation.js

import { useState, useCallback, useEffect } from "react";

/**
 * useLocation - gets user's geolocation (lat, lon) with graceful fallback
 */
export default function useLocation() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---- SAFE: Only run geolocation inside useEffect ----
  const tryGeo = useCallback(() => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation not supported in this browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message || "Permission denied.");
        setLoading(false);
      },
      { timeout: 8000 }
    );
  }, []);

  // ❗ Run geolocation ONCE after mount - NOT inside render
  useEffect(() => {
    tryGeo();
  }, [tryGeo]);

  // ------- Manual city input fallback -------
  const askForManual = () => {
    const city = prompt("Enter city (Ex: Mumbai, India)");

    if (!city) return;

    fetch(`https://geocode.maps.co/search?q=${encodeURIComponent(city)}`)
      .then((r) => r.json())
      .then((arr) => {
        if (arr && arr.length) {
          const first = arr[0];
          setLocation({
            latitude: parseFloat(first.lat),
            longitude: parseFloat(first.lon),
          });
          setError(null);
        } else {
          setError("Could not find that location.");
        }
      })
      .catch(() => setError("Failed to locate that city."));
  };

  return { location, loading, error, askForManual };
}
