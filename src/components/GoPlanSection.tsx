"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// --- 1. Component ย่อยสำหรับแผ่นโน้ตสัญญา (Promises) ---
function PromiseNote({ promise, toggle, idx }: any) {
  // สุ่มมุมเอียงให้ดูเหมือนแปะกระดาษจริงบนผนัง
  const rotations = [-2, 1.5, -1, 3, -3, 2];
  const rotation = rotations[idx % rotations.length];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
      onClick={() => toggle(promise.id)}
      className={`relative cursor-pointer p-6 shadow-2xl transition-all duration-500 ${
        promise.achieved 
        ? 'bg-white text-[#7a1212] shadow-black/10' 
        : 'bg-[#fdfcf0] text-[#7a1212] shadow-black/30'
      }`}
      style={{
        width: '100%',
        maxWidth: '280px',
        minHeight: '220px',
        aspectRatio: '1/1',
        // ทำมุมพับกระดาษเล็กๆ ที่มุมล่างขวา
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%)',
      }}
    >
      {/* รอยเทปใสแปะหัวกระดาษ */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-7 bg-white/30 backdrop-blur-[1px] rotate-[-2deg] z-10 border-x border-white/10" />

      <div className="flex flex-col h-full justify-between relative z-0">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40">
              {promise.achieved ? '✓ Achieved' : '○ Future Promise'}
            </span>
            <span className="text-xs opacity-20 italic">#{idx + 1}</span>
          </div>
          
          <h3 className={`text-xl md:text-2xl font-black leading-tight italic transition-all duration-500 ${
            promise.achieved ? 'line-through opacity-20' : 'opacity-100'
          }`}>
            {promise.task}
          </h3>
        </div>

        <div className="flex justify-end">
          <motion.span 
            animate={promise.achieved ? { scale: [1, 1.2, 1] } : {}}
            className={`text-2xl transition-colors ${promise.achieved ? 'text-[#7a1212]' : 'text-[#7a1212]/10'}`}
          >
            {promise.achieved ? '♥' : '♡'}
          </motion.span>
        </div>
      </div>

      {/* ลายเส้นบรรทัดจางๆ ให้ฟีลกระดาษโน้ต */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] flex flex-col justify-evenly px-6 py-10">
        {[...Array(4)].map((_, i) => <div key={i} className="border-b border-[#7a1212] w-full" />)}
      </div>
    </motion.div>
  );
}

// --- 2. Component หลัก GoPlanSection (รับ props onUnlock เพื่อวาร์ป) ---
export default function GoPlanSection({ onUnlock }: { onUnlock: () => void }) {
  const [inputValue, setInputValue] = useState("");
  const [promises, setPromises] = useState([
    { id: 1, task: "พาไปดูซากุระที่ญี่ปุ่น", achieved: false },
    { id: 2, task: "ซื้อบ้านที่มีสวนดอกไม้ให้เธอ", achieved: false },
    { id: 3, task: "ไปกินหมูกระทะร้านโปรดให้พุงกาง", achieved: true },
    { id: 4, task: "นั่งดูพระอาทิตย์ตกที่บรรทัดทอง", achieved: false },
  ]);

  const toggleAchieved = (id: number) => {
    setPromises(promises.map(p => p.id === id ? { ...p, achieved: !p.achieved } : p));
  };

  const addPromise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setPromises([{ id: Date.now(), task: inputValue, achieved: false }, ...promises]);
    setInputValue("");
  };

  return (
    <section className="min-h-screen w-full bg-[#7a1212] p-6 md:p-20 overflow-x-hidden font-mono">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-20 text-center text-[#fdfcf0]">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter"
          >
            Future <br/> Notes
          </motion.h1>
          <p className="mt-4 text-[10px] tracking-[0.6em] opacity-40 uppercase font-sans">
            Writing our dreams on paper
          </p>
        </header>

        {/* --- Input Form --- */}
        <form onSubmit={addPromise} className="mb-28 max-w-lg mx-auto relative group">
          <motion.div 
            whileFocus={{ scale: 1.02 }}
            className="bg-[#fdfcf0] p-8 shadow-[15px_15px_0px_rgba(0,0,0,0.2)] rotate-[-1deg] relative z-10"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-10 bg-white/40 backdrop-blur-[2px] z-10 border-x border-white/5" />
            
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.3em] text-[#7a1212]/40 font-bold mb-1">
                New Promise:
              </label>
              <textarea 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="ในอนาคตฉันจะพาเธอไป..."
                rows={2}
                className="bg-transparent border-none outline-none text-[#7a1212] text-xl md:text-2xl italic placeholder:opacity-20 resize-none font-black leading-tight"
              />
              <div className="w-full h-[2px] bg-[#7a1212]/10 mt-2" />
              <div className="flex justify-end mt-4">
                <button 
                  type="submit"
                  className="text-[#7a1212] font-black text-xs uppercase tracking-widest hover:underline transition-all"
                >
                  Confirm Promise →
                </button>
              </div>
            </div>
          </motion.div>
          <div className="absolute inset-0 bg-[#fdfcf0]/10 -z-10 translate-x-2 translate-y-2 rotate-1" />
        </form>

        {/* --- List Section --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          <AnimatePresence mode='popLayout'>
            {promises.map((p, idx) => (
              <PromiseNote 
                key={p.id} 
                promise={p} 
                toggle={toggleAchieved} 
                idx={idx} 
              />
            ))}
          </AnimatePresence>
        </div>

        {/* --- ปุ่มลับสำหรับวาร์ป (The Creative Bridge) อัปเกรดแล้ว --- */}
        <div className="mt-40 mb-20 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onUnlock}
            className="relative cursor-pointer group"
          >
            {/* 1. วงแหวนรัศมีกระจายออก (Pulsing Effect) เพื่อบอกว่ากดได้ */}
            <motion.div
              animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
              className="absolute inset-0 bg-[#fdfcf0] rounded-full -z-10"
            />

            {/* 2. ตัวตราประทับ (Wax Seal) */}
            <div className="w-24 h-24 bg-[#5a0d0d] rounded-full shadow-[inset_0_0_15px_rgba(0,0,0,0.5),5px_10px_20px_rgba(0,0,0,0.3)] flex items-center justify-center relative border-2 border-[#7a1212]">
              <div className="absolute inset-[-5px] rounded-full border-[6px] border-[#5a0d0d] opacity-80 blur-[1px]" />
              <motion.span 
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-[#fdfcf0] text-4xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
              >
                ♥
              </motion.span>
            </div>

            {/* 3. ข้อความกำกับแบบเนียนๆ (Pulsing Text) */}
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-max text-center"
            >
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[#fdfcf0] drop-shadow-lg">
                Tap to claim surprise
              </p>
              <div className="w-full h-[1.5px] bg-[#fdfcf0]/40 mt-1 shadow-sm" />
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}