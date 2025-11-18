import React from "react";
import Sparkline from "./Sparkline";

export default function MarketWidget() {
  const data = [10, 15, 13, 18, 25, 20, 30, 28, 33, 40];

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-4 rounded-xl w-full max-w-xs shadow-lg">
      <h3 className="text-lg font-semibold">Market Rally</h3>
      <p className="text-gray-300 text-sm">Stocks up <span className="text-teal-400 font-bold">2.3%</span> today</p>
      <div className="mt-2">
        <Sparkline data={data} />
      </div>
    </div>
  );
}
