import React from 'react';
import { motion } from 'framer-motion';
export default function Header({ title }) {
  return (
    <motion.header initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="w-full border-b border-white/6 bg-gradient-to-b from-darkBg to-darkBg2">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <nav className="flex gap-6 text-muted text-sm">
          <a href="#top" className="hover:text-accent transition">Top</a>
          <a href="#politics" className="hover:text-accent transition">Politics</a>
          <a href="#sports" className="hover:text-accent transition">Sports</a>
        </nav>
      </div>
    </motion.header>
  );
}