"use client";
import { useState } from 'react';
import LobbySection from '../src/components/LobbySection';
import AnniversarySection from '../src/components/AnniversarySection';
import GallerySection from '../src/components/GallerySection';
import TransitionPage from '../src/components/TransitionPage';
import GoPlanSection from '../src/components/GoPlanSection'; // เพิ่ม import ตัวใหม่

export default function Home() {
  // ควบคุม Step การทำงาน: lobby -> anniversary -> gallery -> transition -> goplan
  const [currentStep, setCurrentStep] = useState<'lobby' | 'anniversary' | 'gallery' | 'transition' | 'goplan'>('lobby');

  return (
    <main className="min-h-screen bg-[#7a1212]">
      
      {/* 1. หน้าแมว (Lobby) */}
      {currentStep === 'lobby' && (
        <LobbySection onEnter={() => setCurrentStep('anniversary')} />
      )}

      {/* 2. หน้าปฏิทิน (Anniversary) */}
      {currentStep === 'anniversary' && (
        <AnniversarySection onFinish={() => setCurrentStep('gallery')} />
      )}

      {/* 3. หน้าคลังรูปภาพ (Gallery) */}
      {currentStep === 'gallery' && (
        <GallerySection onNext={() => setCurrentStep('transition')} /> 
      )}

      {/* 4. หน้าอนิเมชั่นคั่นเวลา (Transition รถวิ่งสีแดง) */}
      {currentStep === 'transition' && (
        <TransitionPage onComplete={() => setCurrentStep('goplan')} />
      )}

      {/* 5. หน้าแผนท่องเที่ยวในอนาคต (GoPlan) */}
      {currentStep === 'goplan' && (
        <GoPlanSection /> // เรียกใช้คอมโพเนนต์ GoPlan ที่เราสร้างไว้
      )}

    </main>
  );
}