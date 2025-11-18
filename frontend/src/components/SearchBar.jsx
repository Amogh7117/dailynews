import React, { useState } from 'react';
import { motion } from 'framer-motion';
export default function SearchBar({ onSearch }){
  const [q,setQ] = useState('');
  function submit(e){ e.preventDefault(); onSearch(q.trim()); }
  return (
    <motion.form onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
      <div className="flex gap-2">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search headlines or keywords..." className="flex-1 p-3 rounded-xl bg-white/5 placeholder:text-muted" />
        <button className="px-4 py-2 bg-accent text-black rounded-xl">Search</button>
      </div>
    </motion.form>
  );
}