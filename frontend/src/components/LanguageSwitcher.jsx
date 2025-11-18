import React from 'react';
import { motion } from 'framer-motion';
const options = [{ code: 'en', label: 'English' },{ code: 'hi', label: 'हिंदी' },{ code: 'bn', label: 'বাংলা' },{ code: 'mr', label: 'मराठी' }];
export default function LanguageSwitcher({ languages, setLanguages }){
  function toggle(code){ setLanguages(prev => prev.includes(code) ? prev.filter(l => l !== code) : [...prev, code]); }
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/3 p-4 rounded-xl w-full lg:w-auto">
      <p className="text-sm text-muted mb-2">Languages</p>
      <div className="flex flex-wrap gap-2">
        {options.map(o => (
          <button key={o.code} onClick={() => toggle(o.code)} className={`px-3 py-1 rounded-full text-sm transition ${languages.includes(o.code) ? 'bg-accent text-black' : 'bg-white/5 text-muted hover:bg-white/10'}`}>
            {o.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}