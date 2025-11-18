import React, { useEffect, useState } from 'react';
export default function Bookmarks(){
  const [items, setItems] = useState([]);
  useEffect(()=> { try { setItems(JSON.parse(localStorage.getItem('dn_bookmarks')||'[]')); } catch { setItems([]); } },[]);
  if (!items.length) return <div className="p-4 bg-white/3 rounded-xl text-muted">No bookmarks yet.</div>;
  return (
    <div className="p-4 bg-white/3 rounded-xl">
      <h3 className="font-semibold mb-2">Saved</h3>
      <ul className="list-disc pl-5 space-y-1">{items.map((s,i)=> <li key={i}><a className="text-accent" href={s.url} target="_blank" rel="noreferrer">{s.title}</a></li>)}</ul>
    </div>
  );
}