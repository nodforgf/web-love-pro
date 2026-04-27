"use client";
import { motion } from 'framer-motion';

export default function MusicCassetteSection() {
  // --- ใส่ลิ้งก์ YouTube Playlist ของนายตรงนี้ ---
  const PLAYLIST_URL = "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID";

  return (
    <section className="min-h-screen w-full bg-[#1a1a1a] flex flex-col items-center justify-center p-6 font-mono overflow-hidden">
      
      <header className="mb-16 text-center">
        <h2 className="text-[#fdfcf0] text-3xl font-black italic uppercase tracking-tighter">Our Soundtrack</h2>
        <p className="text-[#fdfcf0]/30 text-[9px] tracking-[0.4em] mt-2">PRESS PLAY TO START THE VIBE</p>
      </header>

      {/* Cassette Tape Design */}
      <motion.div 
        initial={{ rotate: -5, scale: 0.9, opacity: 0 }}
        animate={{ rotate: 2, scale: 1, opacity: 1 }}
        whileHover={{ rotate: 0, scale: 1.05 }}
        className="relative w-full max-w-[450px] aspect-[1.6/1] bg-[#333] rounded-xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-b-8 border-black"
      >
        {/* Label (ส่วนที่เป็นสติกเกอร์) */}
        <div className="w-full h-full bg-[#fdfcf0] rounded-lg p-6 flex flex-col justify-between border-4 border-[#222]">
          
          {/* Top part of sticker */}
          <div className="flex justify-between items-start border-b-2 border-[#7a1212]/20 pb-2">
            <span className="text-[10px] font-bold text-[#7a1212]">SIDE A</span>
            <div className="flex gap-1">
               <div className="w-2 h-2 rounded-full bg-[#7a1212]/20" />
               <div className="w-2 h-2 rounded-full bg-[#7a1212]/20" />
            </div>
          </div>

          {/* Title - ชื่อเพลย์ลิสต์แบบเขียนด้วยลายมือ */}
          <div className="flex-1 flex flex-col items-center justify-center py-4">
             <h3 className="text-[#7a1212] text-2xl md:text-3xl font-black italic tracking-tighter text-center">
                Our Memories <br/> Playlist ❤️
             </h3>
             <p className="text-[10px] text-[#7a1212]/40 mt-2 font-sans font-bold">Mix for my favorite person</p>
          </div>

          {/* Cassette Holes (รูเทป) */}
          <div className="flex justify-around items-center px-8 mb-4">
             <div className="w-12 h-12 rounded-full bg-[#1a1a1a] border-4 border-[#444] flex items-center justify-center">
                <div className="w-4 h-4 bg-[#222] rounded-full animate-spin-slow" style={{ animationDuration: '3s' }} />
             </div>
             <div className="w-20 h-8 bg-[#1a1a1a]/10 rounded-md border border-[#7a1212]/10 flex items-center justify-center">
                <span className="text-[8px] text-[#7a1212]/20 font-bold">60 MIN</span>
             </div>
             <div className="w-12 h-12 rounded-full bg-[#1a1a1a] border-4 border-[#444] flex items-center justify-center">
                <div className="w-4 h-4 bg-[#222] rounded-full animate-spin-slow" style={{ animationDuration: '3s' }} />
             </div>
          </div>
        </div>

        {/* Play Button - วาร์ปไป YouTube */}
        <motion.a
          href='https://www.youtube.com/watch?v=HEqh_tHt9JU&list=RDw7LnzW3UCpo&index=14'
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#7a1212] text-[#fdfcf0] px-10 py-4 rounded-full font-black uppercase tracking-[0.3em] shadow-2xl flex items-center gap-3 z-50 border-4 border-[#1a1a1a]"
        >
          <span className="text-xl">▶</span> PLAY NOW
        </motion.a>
      </motion.div>

      {/* Background Text */}
      <div className="mt-24 opacity-10 select-none pointer-events-none">
         <p className="text-5xl font-black italic text-[#fdfcf0]">LO-FI LOVE TRACKS</p>
      </div>

    </section>
  );
}