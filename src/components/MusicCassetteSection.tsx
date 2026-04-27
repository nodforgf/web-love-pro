"use client";
import { motion } from 'framer-motion';

export default function MusicCassetteSection() {
  // --- ใส่ลิ้งก์ YouTube Playlist ของนายตรงนี้ ---
  const PLAYLIST_URL = "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID";

  return (
    <section className="min-h-screen w-full bg-[#5a0d0d] flex flex-col items-center justify-center p-6 font-mono overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#fdfcf0 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <header className="mb-16 text-center z-10">
        <h2 className="text-[#fdfcf0] text-3xl font-black italic uppercase tracking-tighter">Our Soundtrack</h2>
        <p className="text-[#fdfcf0]/40 text-[9px] tracking-[0.4em] mt-2">PRESS PLAY TO START THE VIBE</p>
      </header>

      {/* Cassette Tape Design - ธีมสีแดง */}
      <motion.div 
        initial={{ rotate: -5, scale: 0.9, opacity: 0 }}
        animate={{ rotate: 2, scale: 1, opacity: 1 }}
        whileHover={{ rotate: 0, scale: 1.05 }}
        className="relative w-full max-w-[450px] aspect-[1.6/1] bg-[#7a1212] rounded-xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)] border-4 border-[#4d0909] z-10"
      >
        {/* Label (ส่วนที่เป็นสติกเกอร์) - เปลี่ยนเป็นสีครีมตัดแดง */}
        <div className="w-full h-full bg-[#fdfcf0] rounded-lg p-6 flex flex-col justify-between border-4 border-[#4d0909]">
          
          {/* Top part of sticker */}
          <div className="flex justify-between items-start border-b-2 border-[#7a1212]/20 pb-2">
            <span className="text-[10px] font-bold text-[#7a1212]">SIDE A</span>
            <div className="flex gap-1">
               <div className="w-2 h-2 rounded-full bg-[#7a1212]/30" />
               <div className="w-2 h-2 rounded-full bg-[#7a1212]/30" />
            </div>
          </div>

          {/* Title - ชื่อเพลย์ลิสต์แบบเขียนด้วยลายมือ */}
          <div className="flex-1 flex flex-col items-center justify-center py-4">
             <h3 className="text-[#7a1212] text-2xl md:text-3xl font-black italic tracking-tighter text-center leading-tight">
                Our Memories <br/> Playlist ❤️
             </h3>
             <p className="text-[10px] text-[#7a1212]/50 mt-3 font-sans font-bold">Mix for my favorite person</p>
          </div>

          {/* Cassette Holes (รูเทป) */}
          <div className="flex justify-around items-center px-8 mb-4">
             <div className="w-12 h-12 rounded-full bg-[#4d0909] border-4 border-[#333] flex items-center justify-center shadow-inner">
                <div className="w-4 h-4 bg-[#7a1212] rounded-full animate-spin-slow" style={{ animationDuration: '3s' }} />
             </div>
             <div className="w-20 h-8 bg-[#4d0909]/10 rounded-md border border-[#7a1212]/10 flex items-center justify-center">
                <span className="text-[8px] text-[#7a1212]/30 font-bold">60 MIN</span>
             </div>
             <div className="w-12 h-12 rounded-full bg-[#4d0909] border-4 border-[#333] flex items-center justify-center shadow-inner">
                <div className="w-4 h-4 bg-[#7a1212] rounded-full animate-spin-slow" style={{ animationDuration: '3s' }} />
             </div>
          </div>
        </div>

        {/* Play Button - วาร์ปไป YouTube (ธีมสีครีม) */}
        <motion.a
          href={PLAYLIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, backgroundColor: "#fff" }}
          whileTap={{ scale: 0.9 }}
          className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-[#fdfcf0] text-[#7a1212] px-10 py-5 rounded-full font-black uppercase tracking-[0.3em] shadow-2xl flex items-center gap-3 z-50 border-4 border-[#4d0909] text-xs"
        >
          <span className="text-xl">▶</span> PLAY NOW
        </motion.a>
      </motion.div>

      {/* Background Text - เปลี่ยนคำตามที่ถาม */}
      <div className="absolute bottom-10 left-10 opacity-[0.03] select-none pointer-events-none z-0">
         <p className="text-[120px] font-black italic text-[#fdfcf0] leading-none">LOFI <br/> VIBES</p>
      </div>

    </section>
  );
}