import React from "react";

export default function Translator({ onTranslate }) {
  return (
    <select
      onChange={(e) => onTranslate(e.target.value)}
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
      <option value="en">🇬🇧 English</option>
      <option value="hi">🇮🇳 Hindi</option>
      <option value="kn">🇮🇳 Kannada</option>
      <option value="mr">🇮🇳 Marathi</option>
      <option value="ta">🇮🇳 Tamil</option>
      <option value="te">🇮🇳 Telugu</option>
    </select>
  );
}
