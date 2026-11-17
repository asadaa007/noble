'use client';
import { useSyncExternalStore, useMemo } from 'react';
import { products } from './products';
const KEY='noble-enquiry';const EVENT='noble-shortlist-change';
const subscribe=(listener:()=>void)=>{window.addEventListener('storage',listener);window.addEventListener(EVENT,listener);return()=>{window.removeEventListener('storage',listener);window.removeEventListener(EVENT,listener);};};
function snapshot(){try{return localStorage.getItem(KEY)||'[]';}catch{return '[]';}}
export function parseShortlist(raw:string):string[]{try{const data:unknown=JSON.parse(raw);return Array.isArray(data)?[...new Set(data.filter((id):id is string=>typeof id==='string'&&products.some(p=>p.id===id)))]:[];}catch{return [];}}
export function useShortlist(){const raw=useSyncExternalStore(subscribe,snapshot,()=> '[]');const ids=useMemo(()=>parseShortlist(raw),[raw]);function update(next:string[]){try{localStorage.setItem(KEY,JSON.stringify(next));window.dispatchEvent(new Event(EVENT));}catch{/* Browser storage may be unavailable. The caller reports no successful selection. */}}function toggle(id:string){const current=parseShortlist(snapshot());update(current.includes(id)?current.filter(x=>x!==id):[...current,id]);}return {ids,toggle,remove:(id:string)=>update(parseShortlist(snapshot()).filter(x=>x!==id)),clear:()=>update([])};}
