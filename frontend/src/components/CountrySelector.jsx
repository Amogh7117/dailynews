import React from "react";

export default function CountrySelector({ country, setCountry }) {
  return (
    <select
      value={country}
      onChange={(e) => setCountry(e.target.value)}
      className="
        px-3 
        py-2 
        rounded-lg 
        text-white 
        text-sm
        bg-white/10 
        border border-white/20 
        backdrop-blur-md
        hover:bg-white/20
        transition-all
      "
    >
      <option value="in">🇮🇳 India</option>
      <option value="us">🇺🇸 USA</option>
      <option value="gb">🇬🇧 UK</option>
      <option value="ae">🇦🇪 UAE</option>
      <option value="au">🇦🇺 Australia</option>
      <option value="ca">🇨🇦 Canada</option>
      <option value="sg">🇸🇬 Singapore</option>
    </select>
  );
}
