"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';

// --- 1. Interface (ดึงมาไว้บนสุดเพื่อแก้ Error ใน page.tsx) ---
interface PhotoCardProps {
  photoUrl: string;
  idx: number;
  style: { top: string; left: string; rotate: number };
  totalPhotos: number;
}

interface GallerySectionProps {
  onNext: () => void; // ต้องรับ onNext เพื่อกดไปหน้าถัดไป
}

// --- 2. Component PhotoCard (Flip Effect + Hint สติกเกอร์) ---
function PhotoCard({ photoUrl, idx, style, totalPhotos }: PhotoCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // ข้อความสุ่มหลังรูป
  const messages = [
    "รูปนี้ตอนที่เราไปกินข้าวด้วยกันครั้งแรก จำได้ไหม? ♥",
    "เธอน่ารักที่สุดเลยในรูปนี้ ยิ้มกว้างเชียว",
    "ขอบคุณที่อยู่ข้างกันในวันที่เหนื่อยๆ นะ",
    "รูปนี้ถ่ายยากมาก แต่เธอก็ยังสวยอยู่ดี",
    "อยากไปเที่ยวที่แบบนี้กับเธออีกจัง",
    "รักเธอมากกว่าเมื่อวาน และจะรักน้อยกว่าวันพรุ่งนี้",
    "ความทรงจำที่ดีที่สุด คือการที่มีเธออยู่ในนั้น",
    "Happy Anniversary นะคะคนดี ♥"
  ];

  return (
    <motion.div
      className="absolute cursor-pointer z-10"
      style={{
        top: style.top,
        left: style.left,
        width: "20rem", // w-80
        height: "25rem", // h-[400px]
        perspective: "1000px", // จำเป็นสำหรับ 3D effect
      }}
      // อนิเมชั่นกระจายตัวออกมาจากกลางจอแบบนุ่มนวล
      initial={{ opacity: 0, scale: 0, x: "-50%", y: "300px", left: "50%", rotate: 0 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0, left: style.left, top: style.top, rotate: style.rotate }}
      transition={{ delay: idx * 0.2, duration: 1.8, type: "spring", stiffness: 40, damping: 15 }}
      // ลากเล่นได้
      drag
      dragConstraints={{ top: -300, bottom: 300, left: -300, right: 300 }}
      // คลิกเพื่อหมุน
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full bg-[#fdfcf0] p-3 pb-12 shadow-[0_25px_50px_rgba(0,0,0,0.5)] border border-white/10 rounded-sm"
        style={{ transformStyle: "preserve-3d" }} // จำเป็นสำหรับ 3D
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* --- หน้าแรก (Front): รูปถ่าย --- */}
        <div className="absolute inset-3 bottom-12" style={{ backfaceVisibility: "hidden" }}>
          {/* กิมมิคเทปใสแปะหัวรูป (2 รูปแรก) */}
          {idx < 2 && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/20 backdrop-blur-[2px] rotate-[-5deg] border-x border-white/10 z-20" />
          )}

          <div className="relative w-full h-full bg-gray-200 overflow-hidden rounded-sm pointer-events-none">
            <img src={photoUrl} className="w-full h-full object-cover" alt="Memory" />
          </div>

          <div className="absolute -bottom-9 left-0 w-full text-center">
            <span className="text-[#7a1212]/30 text-[10px] font-black tracking-widest uppercase pointer-events-none">
              ♥ {idx + 1} / {totalPhotos} ♥
            </span>
          </div>

          {/* สติกเกอร์บอกให้กด (จางหายเมื่อ Flip) */}
          <motion.div
            animate={{ opacity: isFlipped ? 0 : [0.5, 1, 0.5] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -right-4 top-1/2 -translate-y-1/2 rotate-[15deg] pointer-events-none"
          >
            <span className="bg-[#d31d1d] text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap">
              Tap to flip
            </span>
          </motion.div>
        </div>

        {/* --- หน้าหลัง (Back): ข้อความ --- */}
        <div 
          className="absolute inset-3 bottom-12 flex flex-col items-center justify-center p-6 bg-[#fdfcf0] rounded-sm" 
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="text-[#7a1212] mb-2 text-xl">♥</span>
          <p className="text-[#7a1212] text-[13px] font-bold text-center leading-relaxed italic">
            "{messages[idx % messages.length]}"
          </p>
          <div className="w-8 h-[1px] bg-[#7a1212]/20 my-4" />
          <span className="text-[#7a1212]/40 text-[9px] uppercase tracking-tighter">
            Memory #{idx + 1}
          </span>
          <span className="absolute bottom-2 text-[#7a1212]/20 text-[8px]">Tap to flip back</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- 3. Component หลัก (Gallery Section) ---
export default function GallerySection({ onNext }: GallerySectionProps) {
  const myPhotos = [
    "/photo1.jpg", "/photo2.jpg", "/photo3.jpg", "/photo4.jpg",
    "/photo5.jpg", "/photo6.jpg", "/photo7.jpg", "/photo8.jpg"
  ];

  const scatteredStyles = [
    { top: '5%', left: '15%', rotate: -8 },
    { top: '8%', left: '65%', rotate: 12 },
    { top: '25%', left: '40%', rotate: -15 },
    { top: '35%', left: '5%', rotate: 10 },
    { top: '45%', left: '60%', rotate: -5 },
    { top: '60%', left: '20%', rotate: 18 },
    { top: '75%', left: '55%', rotate: -10 },
    { top: '85%', left: '10%', rotate: 5 },
  ];

  return (
    <section className="relative min-h-screen w-full bg-[#7a1212] overflow-hidden font-mono">
      
      {/* Background Title */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ duration: 2 }}
          className="text-[#fdfcf0] text-[5rem] md:text-[12rem] font-black italic uppercase leading-none text-center select-none"
        >
          Our <br /> Memories
        </motion.h1>
      </div>

      {/* --- แก้ไขจุดนี้: ปุ่ม See our future แบบไม้ตาย ลอยทับ 3D แน่นอน --- */}
      <div className="fixed bottom-12 left-0 w-full flex justify-center pointer-events-none" style={{ zIndex: 9999 }}>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onNext}
          // เพิ่ม z-index และ translateZ เพื่อยกมิติให้สูงกว่ารูป
          className="pointer-events-auto bg-[#fdfcf0] text-[#7a1212] px-10 py-4 rounded-full font-black uppercase tracking-widest shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-2 border-white/20"
          style={{ 
            transform: "translateZ(500px)", 
            boxShadow: "0 0 50px rgba(0,0,0,0.5)"
          }}
        >
          See our future →
        </motion.button>
      </div>

      {/* พื้นที่โปรยรูปภาพ (เลื่อนได้) */}
      <div className="relative w-full h-screen overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div className="relative w-full max-w-[1000px] min-h-[1800px] mx-auto py-10">
          
          {myPhotos.map((p, idx) => {
            const style = scatteredStyles[idx % scatteredStyles.length];
            return (
              <PhotoCard 
                key={idx}
                photoUrl={p}
                idx={idx}
                style={style}
                totalPhotos={myPhotos.length}
              />
            );
          })}
          
          {/* เว้นพื้นที่ด้านล่างเพื่อให้เลื่อนมาเจอจุดที่ปุ่มทำงาน */}
          <div className="h-[300px] w-full" />
        </div>
      </div>

      {/* ละอองหัวใจ */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ y: '110vh', x: `${Math.random() * 100}vw`, opacity: 0 }}
            animate={{ y: '-10vh', opacity: [0, 0.3, 0] }}
            transition={{ repeat: Infinity, duration: 5 + Math.random() * 5, delay: Math.random() * 5 }}
            className="absolute text-[#fdfcf0] text-2xl"
          >
            ♥
          </motion.span>
        ))}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
        }
      `}</style>
    </section>
  );
}