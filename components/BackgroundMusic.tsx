'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.4;
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.then(() => {
            setIsPlaying(true);
        }).catch((error) => {
          console.log("Autoplay prevented:", error);
          setIsPlaying(false);
        });
      }
    }
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src="/bgm.mp3"
        loop
        preload="auto"
      />
      
      <div 
        className="fixed bottom-8 left-8 z-50 cursor-pointer group perspective-[1000px] hidden md:block"
        onClick={togglePlay}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        aria-label={isPlaying ? "Mute sound" : "Play sound"}
      >
        <motion.div
            className="relative flex items-end justify-center gap-[2px] transform-style-3d"
            initial={{ rotateY: 25, rotateX: 10 }}
            animate={{ 
                rotateY: isHovered ? 15 : 25, 
                rotateX: isHovered ? 5 : 10,
                y: isPlaying ? [0, -4, 0] : 0
            }}
            transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotateY: { duration: 0.3 },
                rotateX: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
        >
            {/* TARS Segments */}
            {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`
                    w-5 h-24 bg-zinc-800 border border-zinc-600 
                    ${i === 0 ? 'rounded-l-sm' : ''} 
                    ${i === 3 ? 'rounded-r-sm' : ''}
                    shadow-[2px_2px_0px_rgba(0,0,0,0.5)] relative overflow-hidden
                    flex flex-col items-center
                `}>
                    {/* Metallic sheen */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none"></div>
                    
                    {/* Details on specific segments */}
                    {i === 1 && (
                        <>
                            {/* Status Light */}
                            <div className="mt-3 w-2 h-2 rounded-full bg-black border border-zinc-600 flex items-center justify-center">
                                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isPlaying ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'}`}></div>
                            </div>
                            {/* Screen lines */}
                            <div className="mt-2 flex flex-col gap-[2px] opacity-60">
                                <div className="w-3 h-[1px] bg-green-500/50"></div>
                                <div className="w-3 h-[1px] bg-green-500/50"></div>
                                <div className="w-2 h-[1px] bg-green-500/50 self-start"></div>
                            </div>
                        </>
                    )}
                    
                    {/* Joint lines */}
                    <div className="absolute bottom-4 w-full h-[1px] bg-zinc-900/50"></div>
                </div>
            ))}
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
            {isHovered && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1 bg-zinc-900 border border-zinc-700 rounded text-xs font-mono text-zinc-300 whitespace-nowrap"
                >
                    TARS: {isPlaying ? 'ON' : 'OFF'}
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </>
  );
}
