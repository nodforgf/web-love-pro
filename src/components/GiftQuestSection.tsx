"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti'; // อย่าลืมลง npm install canvas-confetti นะบักณฐ

const CARD_IMAGES = [
    "/images/couple1.jpg", // เช็กว่าชื่อไฟล์ในโฟลเดอร์ public/images เป็นชื่อนี้จริงมั้ย
    "/images/couple2.jpg",
    "/images/couple3.jpg",
    "/images/couple4.jpg",
    "/images/couple5.jpg",
    "/images/couple6.jpg",
];

export default function GiftQuestSection({ onBack, onFinish }: { onBack: () => void, onFinish: () => void }) {    const [cards, setCards] = useState(() =>
        [...CARD_IMAGES, ...CARD_IMAGES]
            .sort(() => Math.random() - 0.5)
            .map((img, index) => ({ id: index, img, flipped: false, matched: false }))
    );

    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [isWon, setIsWon] = useState(false);
    const [showWheel, setShowWheel] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState<string | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);

    const GIFTS = [
        "พาไปกินบุฟเฟต์ 🥩", "ตามใจ 1 วัน ✨", "นวดไหล่ให้ 30 นาที 💆‍♀️", "ตั๋วหนัง 2 ที่นั่ง 🍿",
        "จุ๊บเหม่ง 1 ที 😘", "ซื้อลิปสติกใหม่ 💄", "พาไปเที่ยวทะเล 🌊", "งดดื้อ 1 อาทิตย์ 🙏"
    ];

    // --- เอฟเฟกต์พลุฉลองตอนชนะ ---
    const fireConfetti = () => {
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#fdfcf0', '#7a1212', '#ff0000']
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#fdfcf0', '#7a1212', '#ff0000']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };

    const handleCardClick = (id: number) => {
        if (flippedCards.length >= 2 || cards[id].flipped || cards[id].matched) return;
        const newCards = [...cards];
        newCards[id].flipped = true;
        setCards(newCards);
        const newFlipped = [...flippedCards, id];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            const [first, second] = newFlipped;
            if (cards[first].img === cards[second].img) {
                newCards[first].matched = true;
                newCards[second].matched = true;
                setCards(newCards);
                setFlippedCards([]);
            } else {
                setTimeout(() => {
                    newCards[first].flipped = false;
                    newCards[second].flipped = false;
                    setCards(newCards);
                    setFlippedCards([]);
                }, 600);
            }
        }
    };

    useEffect(() => {
        if (cards.length > 0 && cards.every(card => card.matched)) {
            setIsWon(true);
            fireConfetti(); // เรียกใช้พลุทันทีที่ชนะ
        }
    }, [cards]);

    const spinWheel = () => {
        if (isSpinning) return;
        const newRotation = rotation + 1800 + Math.random() * 360;
        setRotation(newRotation);
        setIsSpinning(true);
        setTimeout(() => {
            const index = Math.floor((360 - (newRotation % 360)) / (360 / GIFTS.length)) % GIFTS.length;
            setResult(GIFTS[index]);
            setIsSpinning(false);
            fireConfetti(); // ยิงพลุอีกรอบตอนได้ของรางวัล!
        }, 4000);
    };

    return (
        <section className="min-h-screen w-full bg-[#7a1212] flex flex-col items-center justify-center p-6 font-mono text-[#fdfcf0] relative z-50 overflow-hidden">
            <button onClick={onBack} className="absolute top-6 left-6 z-[60] text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 p-2">
                ← Back
            </button>

            {!showWheel ? (
                <div className="max-w-md w-full flex flex-col items-center z-50">
                    <motion.h2
                        animate={isWon ? { scale: [1, 1.1, 1], rotate: [-2, 2, -2] } : {}}
                        className="text-4xl font-black uppercase italic mb-8 tracking-tighter"
                    >
                        {isWon ? "✨ YOU DID IT! ✨" : "Memory Quest"}
                    </motion.h2>

                    <motion.div
                        animate={isWon ? { y: [0, -10, 0] } : {}}
                        className="grid grid-cols-3 gap-3 w-full relative"
                    >
                        {cards.map((card) => (
                            <div key={card.id} onClick={() => handleCardClick(card.id)} className="aspect-square cursor-pointer relative z-50" style={{ perspective: '1000px' }}>
                                <motion.div animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }} transition={{ duration: 0.4 }} className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
                                    <div className="absolute inset-0 bg-[#fdfcf0]/20 border border-[#fdfcf0]/30 rounded-xl flex items-center justify-center text-3xl font-black shadow-inner" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>?</div>
                                    <div className="absolute inset-0 bg-[#fdfcf0] rounded-xl overflow-hidden shadow-2xl" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                        <img src={card.img} alt="couple" className="w-full h-full object-cover" />
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </motion.div>

                    <AnimatePresence>
                        {isWon && (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center"
                            >
                                <motion.p
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="mt-6 text-xs font-black uppercase tracking-[0.4em] text-yellow-400"
                                >
                                    Master of Memory!
                                </motion.p>
                                <motion.button
                                    whileHover={{ scale: 1.1, boxShadow: "0_0_40px_rgba(253,252,240,0.6)" }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setShowWheel(true)}
                                    className="mt-8 bg-[#fdfcf0] text-[#7a1212] px-12 py-5 rounded-full font-black uppercase shadow-[0_10px_40px_rgba(0,0,0,0.4)] z-[70] text-lg"
                                >
                                    Go to Lucky Wheel 🎡
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ) : (
                <div className="flex flex-col items-center z-50">
                    {/* ส่วนวงล้อเหมือนเดิม... */}
                    <h2 className="text-4xl font-black italic uppercase mb-10">Lucky Wheel</h2>
                    <div className="relative w-72 h-72 md:w-80 md:h-80">
                        <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 z-[100] text-[#fdfcf0] text-4xl drop-shadow-lg">▼</div>
                        <motion.div animate={{ rotate: rotation }} transition={{ duration: 4, ease: [0.45, 0.05, 0.55, 0.95] }} className="w-full h-full rounded-full border-4 border-[#fdfcf0] relative overflow-hidden bg-[#fdfcf0] shadow-2xl">
                            {GIFTS.map((gift, i) => (
                                <div key={i} className="absolute top-0 left-1/2 w-1/2 h-full origin-left flex items-center justify-end pr-2 border-l border-[#7a1212]/5" style={{ transform: `rotate(${(360 / GIFTS.length) * i}deg)`, backgroundColor: i % 2 === 0 ? '#fdfcf0' : '#f8f4e1' }}>
                                    <span className="text-[#7a1212] font-black text-[9px] rotate-[-90deg] translate-x-3 w-20 text-center uppercase">{gift}</span>
                                </div>
                            ))}
                        </motion.div>
                        <div className="absolute inset-0 m-auto w-8 h-8 bg-[#7a1212] rounded-full border-2 border-[#fdfcf0] z-20" />
                    </div>
                    <button onClick={spinWheel} disabled={isSpinning} className={`mt-12 px-12 py-4 rounded-full font-black uppercase transition-all shadow-2xl ${isSpinning ? 'opacity-30' : 'bg-[#fdfcf0] text-[#7a1212] hover:scale-110'}`}>
                        {isSpinning ? 'Good Luck...' : 'Spin Now!'}
                    </button>
                </div>
            )}

            {/* Result Modal - ค้นหาคำนี้ในไฟล์นายนะ */}
<AnimatePresence>
  {result && (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#7a1212]/95 p-6 backdrop-blur-xl"
    >
      <motion.div 
        initial={{ scale: 0.5, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        className="bg-[#fdfcf0] p-12 rounded-[40px] text-center max-w-sm shadow-[0_20px_80px_rgba(0,0,0,0.5)] border-8 border-[#5a0d0d]"
      >
        <motion.span 
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-7xl block mb-6"
        >
          🎁
        </motion.span>
        <p className="text-[#7a1212]/60 text-xs font-bold uppercase tracking-[0.2em] mb-2">Congratulations!</p>
        <h3 className="text-[#7a1212] font-black text-4xl uppercase italic mb-6 leading-tight">{result}</h3>
        <div className="w-full h-px bg-[#7a1212]/10 mb-8" />
        
        {/* --- วางปุ่มที่พี่แก้ให้ ตรงนี้เลย! --- */}
        <button 
          onClick={() => {
            setResult(null); // ปิด Pop-up
            onFinish();      // วาร์ปไปหน้าจดหมาย (LetterSection)
          }} 
          className="w-full py-4 bg-[#7a1212] text-[#fdfcf0] font-black rounded-2xl hover:bg-black transition-colors uppercase tracking-widest"
        >
          Keep it Forever
        </button>
        {/* ---------------------------------- */}
        
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
        </section>
    );
}