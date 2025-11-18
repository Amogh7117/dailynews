import React from 'react';
import { motion } from 'framer-motion';
export default function TrendingCarousel({ items = [] }){
  return (
    <div className="flex gap-4 overflow-x-auto py-2 scrollbar-thin">
      {items.map((it,i) => (
        <motion.div key={i} initial={{ opacity:0, x: 20 }} animate={{ opacity:1, x:0 }} transition={{ delay: i*0.05 }} className="min-w-[220px] p-4 bg-white/3 rounded-xl">
          <h4 className="font-semibold">{it.title}</h4>
          <div className="text-sm text-muted mt-1">{it.summary}</div>
        </motion.div>
      ))}
    </div>
  );
}