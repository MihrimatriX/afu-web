'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react';

const Hero = () => {
  // Mouse cursor için
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorSize = useMotionValue(32); // Cursor boyutu için
  
  const springConfig = { damping: 25, stiffness: 700 };
  const mouseX = useSpring(cursorX, springConfig);
  const mouseY = useSpring(cursorY, springConfig);
  const size = useSpring(cursorSize, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        cursorSize.set(64); // Hover durumunda büyüt
      }
    };

    const handleMouseOut = () => {
      cursorSize.set(32); // Normal duruma dön
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    // Mouse'u gizle
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Glitch efekti için
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Custom Cursor - Sadece desktop'ta görünür */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          width: size,
          height: size,
        }}
        className="fixed pointer-events-none z-50 mix-blend-difference hidden md:block"
      >
        <motion.div 
          className="w-full h-full rounded-full bg-white"
          animate={{
            boxShadow: [
              '0 0 20px rgba(255, 255, 255, 0.2), 0 0 40px rgba(255, 255, 255, 0.1)',
              '0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.3)',
              '0 0 20px rgba(255, 255, 255, 0.2), 0 0 40px rgba(255, 255, 255, 0.1)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Diagonal Split Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#111]" />
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(45deg, transparent 49.5%, white 49.5%, white 50.5%, transparent 50.5%)'
          }}
        />
      </div>

      <div className="container mx-auto px-6 pt-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-7xl font-bold mb-4 leading-tight mix-blend-difference">
            I'm a Web Designer
          </h1>
          <div className="flex items-center gap-2 mb-8">
            <h2 
              className={`text-xl relative ${glitchActive ? 'glitch' : ''}`}
              data-text="Step by step"
            >
              Step by step
            </h2>
            <span className="bg-white text-black px-3 py-1 text-sm font-medium">
              FOR BEGINNERS
            </span>
          </div>

          {/* Sosyal medya linkleri */}
          <div className="flex gap-6 mb-12">
            {['facebook', 'twitter', 'youtube', 'linkedin'].map((social) => (
              <motion.a
                key={social}
                href={`https://${social}.com`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-gray-400 hover:text-white transition-colors mix-blend-difference"
              >
                <span className="w-6 h-6 block">
                  <Image 
                    src={`/${social}.svg`}
                    alt={social}
                    width={24}
                    height={24}
                  />
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Animasyonlu geometrik şekiller */}
      <div className="absolute inset-0 pointer-events-none mix-blend-difference">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-[40%] w-32 h-32 border border-white/10"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-40 right-[30%] w-24 h-24 border border-white/10 rounded-full"
        />
      </div>
    </div>
  )
}

export default Hero 