import React from 'react';
import { motion } from 'framer-motion';
const CATS = ['all','politics','sports','business','technology','entertainment','health','science'];
export default function CategoryFilter({ category, setCategory }){
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/3 p-4 rounded-xl w-full lg:w-auto">
      <p className="text-sm text-muted mb-2">Category</p>
      <div className="flex flex-wrap gap-2">
        {CATS.map(c => (
          <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1 rounded-full text-sm transition ${category===c ? 'bg-accent text-black' : 'bg-white/5 text-muted hover:bg-white/10'}`}>
            {c[0].toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>
    </motion.div>
  );
}