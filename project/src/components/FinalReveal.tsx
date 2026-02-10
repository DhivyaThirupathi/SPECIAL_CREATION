import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function FinalReveal() {
  const [open, setOpen] = useState(false);
  // Default-ah true kuduthuruken, so page load aagum pothe song play aagum
  const [playSong] = useState(true); 

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-200 via-pink-200 to-red-300 flex items-center justify-center">

      {/* 🔊 YouTube Song (Autoplays on load) */}
      {playSong && (
        <iframe
          className="hidden"
          width="0"
          height="0"
          src="https://www.youtube.com/embed/bXa-wbiXiOw?autoplay=1&loop=1&playlist=bXa-wbiXiOw"
          allow="autoplay"
        />
      )}

      {/* 💓 HEART RAIN (Appears after click) */}
      {open &&
        Array.from({ length: 80 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{ y: "-20vh", opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 3 + Math.random() * 3,
              delay: Math.random() * 2,
              repeat: Infinity,
            }}
            className="absolute"
            style={{ left: `${Math.random() * 100}vw` }}
          >
            <Heart
              className="text-pink-500 fill-pink-500"
              style={{
                width: 12 + Math.random() * 18,
                height: 12 + Math.random() * 18,
              }}
            />
          </motion.div>
        ))}

      {/* 👩‍❤️‍👨 SINGLE GIF IMAGE CENTER */}
      {open && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <img 
              src="/imgs.gif" 
              className="w-64 h-56 object-contain"
              alt="Hugging Animation"
            />
          </motion.div>
        </div>
      )}

      {/* ❤️ HEART CONTAINER */}
      <div
        className="relative w-[360px] h-[360px] cursor-pointer z-10"
        onClick={!open ? handleOpen : undefined}
      >
        {/* LEFT HALF */}
        <motion.div
          animate={{ x: open ? -250 : 0, opacity: open ? 0 : 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        >
          <Heart className="w-full h-full text-red-500 fill-red-500" />
        </motion.div>

        {/* RIGHT HALF */}
        <motion.div
          animate={{ x: open ? 250 : 0, opacity: open ? 0 : 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ clipPath: "inset(0 0 0 50%)" }}
        >
          <Heart className="w-full h-full text-red-500 fill-red-500" />
        </motion.div>

        {/* ✨ FINAL TEXT CONTENT */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: open ? -180 : 0, opacity: open ? 1 : 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <h1 className="text-5xl font-bold text-rose-700 drop-shadow-lg">
            I Love You 💖
          </h1>
          <p className="text-2xl text-rose-600 mt-2 font-semibold italic">
            Happy Valentine’s Day 🌹
          </p>
        </motion.div>
      </div>

      {/* 👇 Hint */}
      {!open && (
        <motion.p
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-16 text-rose-700 text-lg font-bold"
        >
          Click the heart ❤️
        </motion.p>
      )}
    </div>
  );
}