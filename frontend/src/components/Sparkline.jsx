import React from "react";

export default function Sparkline({
  data = [],
  width = 140,
  height = 40,
  stroke = "#2dd4bf"
}) {
  if (!data.length) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / (max - min)) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height}>
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        points={points}
        strokeLinecap="round"
        className="animate-[dash_1.5s_ease-in-out]"
      />
    </svg>
  );
}
