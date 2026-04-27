"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function LetterSection({ onNext }: { onNext: () => void }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="min-h-screen w-full bg-[#5a0d0d] flex flex-col items-center justify-center p-6 font-mono overflow-hidden relative">

            {/* Background Decor */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#fdfcf0 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            <header className="mb-12 text-center z-10">
                <h2 className="text-[#fdfcf0] text-3xl font-black italic uppercase tracking-tighter">Final Note</h2>
                <p className="text-[#fdfcf0]/40 text-[9px] tracking-[0.4em] mt-2">FOR YOUR EYES ONLY</p>
            </header>

            {/* Envelope Container - คุมขนาดให้พอดี */}
            <div className="relative w-full max-w-[450px] h-[300px] mt-20 mb-20">

                {/* 1. Letter Inside (จดหมายที่อยู่ข้างใน) */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ y: 0, opacity: 0 }}
                            animate={{ y: -240, opacity: 1 }} // ดันจดหมายขึ้นให้สูงขึ้นอีกนิด
                            exit={{ y: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 70, damping: 15 }}
                            className="absolute left-[5%] w-[90%] bg-[#fdfcf0] p-8 md:p-10 shadow-2xl z-20 border-l-8 border-[#7a1212]/10"
                            // แก้ตรงนี้: เอา overflowY ออก หรือปรับความสูงให้พอดีกับเนื้อหา
                            style={{ minHeight: '350px' }}
                        >
                            <div className="space-y-6 text-[#7a1212]">
                                <h3 className="text-xl font-black italic border-b border-[#7a1212]/20 pb-4">ถึง... [ชื่อแฟนของนาย]</h3>
                                <div className="text-sm leading-relaxed space-y-4 font-sans italic">
                                    <p>ขอบคุณนะที่อยู่ข้างกันมาตลอด เว็บนี้ตั้งใจทำขึ้นมาเพราะอยากรวมเรื่องราวของเราไว้ในที่เดียว...</p>
                                    <p>ต่อจากนี้ไม่ว่าจะเป็นยังไง ก็อยากให้รู้ว่ารักมากนะบักขี้งอน</p>
                                </div>
                                {/* ส่วน "รักเสมอ" */}
                                <div className="pt-4 text-right font-black italic text-lg border-t border-[#7a1212]/5">
                                    — รักเสมอ, ณฐ
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 2. Envelope Front & Back (ตัวซองจดหมาย) */}
                <div
                    className="relative w-full h-full cursor-pointer z-30"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {/* ส่วนฝาซอง (Top Flap) */}
                    <motion.div
                        animate={{ rotateX: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            transformOrigin: "top",
                            backfaceVisibility: "hidden",
                            zIndex: isOpen ? 10 : 40,
                            clipPath: 'polygon(0 0, 100% 0, 50% 50%)'
                        }}
                        className="absolute top-0 left-0 w-full h-full bg-[#dcd8c0] shadow-sm"
                    />

                    {/* ตัวซองด้านหน้า (Front Body) - ทับจดหมายไว้ตอนปิด */}
                    <div className="absolute inset-0 bg-[#fdfcf0] shadow-2xl rounded-b-lg flex items-center justify-center overflow-hidden">
                        {/* ลายพาดของซองจดหมาย */}
                        <div className="absolute inset-0 border-[20px] border-transparent border-b-[#ece8d0] border-l-[#f4f1e0] border-r-[#f4f1e0]" />

                        {!isOpen && (
                            <div className="z-50 flex flex-col items-center">
                                <div className="w-12 h-12 bg-[#7a1212] rounded-full flex items-center justify-center text-[#fdfcf0] shadow-lg mb-4">♥</div>
                                <span className="text-[#7a1212]/30 font-black text-xs tracking-widest uppercase animate-pulse">Open Me</span>
                            </div>
                        )}
                        
                    </div>
                </div>

            </div>

            {/* --- 3. ส่วนปุ่มกด (แยกออกมาอยู่นอกซองจดหมาย) --- */}
            <div className="h-20 w-full max-w-[450px] flex items-center justify-center z-[100]">
                <AnimatePresence>
                    {isOpen && (
                        <motion.button 
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 }} // ให้จดหมายเด้งขึ้นมาก่อนค่อยโชว์ปุ่ม
                            whileHover={{ scale: 1.1, backgroundColor: "#fdfcf0", color: "#7a1212" }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onNext}
                            className="px-10 py-4 border-4 border-[#fdfcf0] text-[#fdfcf0] font-black uppercase tracking-[0.3em] rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                        >
                            Our Soundtrack →
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            {/* Error Fix: ส่วนพลุกระดาษ ถ้าบักณฐยังไม่ได้ลง library ให้ลบ import confetti ออกก่อนนะ */}
            <footer className="mt-24 opacity-20 text-[#fdfcf0]">
                <p className="text-[9px] uppercase tracking-[1em]">The End of Chapter 1</p>
            </footer>
        </section>
    );
}