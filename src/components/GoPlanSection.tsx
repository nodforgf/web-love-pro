"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function GoPlanSection() {
  // รายการแผนเที่ยว (นายแก้ชื่อที่เที่ยวได้ตามใจชอบเลย!)
  const [plans, setPlans] = useState([
    { id: 1, place: "ไปดูพระอาทิตย์ตกที่บรรทัดทอง", completed: false },
    { id: 2, place: "ทริปญี่ปุ่นปีหน้า (ไปดูซากุระด้วยกัน)", completed: false },
    { id: 3, place: "เดินสยามหาของอร่อยกินจนพุงกาง", completed: false },
    { id: 4, place: "ไปถ่ายรูปตู้สติกเกอร์เพิ่มอีก 10 ใบ", completed: false },
    { id: 5, place: "นอนดู Netflix ด้วยกันทั้งวัน", completed: false },
  ]);

  const togglePlan = (id: number) => {
    setPlans(plans.map(p => p.id === id ? { ...p, completed: !p.completed } : p));
  };

  return (
    <section className="min-h-screen bg-black text-white font-mono p-8 flex flex-col items-center">
      
      {/* 1. Header (Minimal Style) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 mb-16 text-center"
      >
        <h1 className="text-5xl font-black tracking-[0.3em] uppercase">GoPlan</h1>
        <div className="h-1 w-20 bg-white mx-auto mt-4" />
        <p className="mt-4 text-white/40 text-xs tracking-widest uppercase">Our Future Journey</p>
      </motion.div>

      {/* 2. Checklist Area */}
      <div className="w-full max-w-md space-y-6">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => togglePlan(plan.id)}
            className="group cursor-pointer flex items-center gap-4 p-4 border border-white/10 hover:border-white/40 transition-colors rounded-sm"
          >
            {/* Checkbox */}
            <div className={`w-6 h-6 border-2 flex items-center justify-center transition-all ${plan.completed ? 'bg-white border-white' : 'border-white/20'}`}>
              {plan.completed && <span className="text-black text-xs font-bold">✓</span>}
            </div>

            {/* Text */}
            <span className={`text-sm tracking-wide transition-all ${plan.completed ? 'line-through text-white/20' : 'text-white'}`}>
              {plan.place}
            </span>
          </motion.div>
        ))}
      </div>

      {/* 3. Footer Note */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 p-8 border-t border-white/10 w-full max-w-md text-center"
      >
        <p className="text-white/30 text-[10px] leading-relaxed uppercase tracking-[0.2em]">
          "เพราะทุกที่ที่มีเธอ <br/> คือที่ที่น่าไปที่สุดสำหรับฉัน"
        </p>
        <div className="mt-8 text-2xl">♥</div>
      </motion.div>

      {/* ละอองสีขาวเล็กๆ ตกแต่ง */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0, 0.2, 0],
              y: [0, -100] 
            }}
            transition={{ repeat: Infinity, duration: 3 + i, delay: i }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ 
              left: `${Math.random() * 100}vw`, 
              top: `${Math.random() * 100}vh` 
            }}
          />
        ))}
      </div>

    </section>
  );
}