"use client";
import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface TransitionProps {
  onComplete: () => void;
}

export default function TransitionPage({ onComplete }: TransitionProps) {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3800); // เพิ่มเวลานิดนึงให้ดูรถวิ่งสะใจ
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <section className="fixed inset-0 bg-[#7a1212] flex flex-col items-center justify-center overflow-hidden z-[999]">
      
      {/* 1. เส้นถนนวิ่งสวน (Road Lines) */}
      <div className="absolute inset-0 flex justify-center">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 1000, opacity: [0, 0.4, 0] }}
            transition={{
              duration: 0.8, 
              repeat: Infinity,
              delay: i * 0.15,
              ease: "linear"
            }}
            className="absolute w-[4px] h-40 bg-[#fdfcf0]/20"
          />
        ))}
      </div>

      {/* 2. ตัวรถ (The Car) */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          // อนิเมชั่นรถสั่น/โยกเยก
          animate={{ 
            y: [0, -4, 0, -2, 0],
            rotate: [0, 1, -1, 0.5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 0.4, 
            ease: "linear" 
          }}
          className="relative"
        >
          {/* SVG รูปรถมินิมอล (สีครีมตัดแดง) */}
          <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 40C10 34.4772 14.4772 30 20 30H35L45 10H85L95 30H105C110.523 30 115 34.4772 115 40V50H5V40Z" fill="#fdfcf0" />
            <rect x="50" y="15" width="30" height="10" fill="#7a1212" /> {/* กระจก */}
            <circle cx="25" cy="50" r="8" fill="#1a1a1a" /> {/* ล้อหน้า */}
            <circle cx="95" cy="50" r="8" fill="#1a1a1a" /> {/* ล้อหลัง */}
            <circle cx="25" cy="50" r="4" fill="#fdfcf0" />
            <circle cx="95" cy="50" r="4" fill="#fdfcf0" />
          </svg>
          
          {/* ควันออกจากท้ายรถ (กิมมิค) */}
          <div className="absolute -left-4 bottom-2 flex gap-1">
            {[1, 2, 3].map((p) => (
              <motion.div
                key={p}
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: [1, 2], opacity: 0, x: -20, y: -10 }}
                transition={{ repeat: Infinity, duration: 0.6, delay: p * 0.2 }}
                className="w-2 h-2 bg-[#fdfcf0]/40 rounded-full"
              />
            ))}
          </div>
        </motion.div>

        {/* 3. ข้อความสถานะ */}
        <div className="mt-12 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#fdfcf0] text-xl font-black uppercase tracking-[0.6em]"
          >
            Driving to Us
          </motion.h2>
          
          <div className="mt-4 flex gap-2 justify-center">
             <span className="text-[#fdfcf0]/40 text-[10px] font-bold tracking-widest uppercase">Next Destination: Future</span>
          </div>
        </div>
      </div>

      {/* 4. แสงวาบตอนจบ (Fade to White/Cream) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1] }}
        transition={{ duration: 3.8, times: [0, 0.9, 1] }}
        className="fixed inset-0 bg-[#fdfcf0] z-[1000] pointer-events-none"
      />
    </section>
  );
}