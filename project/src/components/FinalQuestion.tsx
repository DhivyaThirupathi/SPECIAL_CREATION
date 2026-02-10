import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface FinalQuestionProps {
  onYes: () => void;
}

export default function FinalQuestion({ onYes }: FinalQuestionProps) {
  const [noClickCount, setNoClickCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const handleNoClick = () => {
    setNoClickCount(prev => prev + 1);

    const newX = Math.random() * 200 - 100;
    const newY = Math.random() * 200 - 100;
    setNoPosition({ x: newX, y: newY });
  };

  const yesScale = 1 + noClickCount * 0.3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-100 to-red-100 flex items-center justify-center p-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center relative"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-8 inline-block"
        >
          <Heart className="w-32 h-32 text-red-500 fill-red-500" />
        </motion.div>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-6xl font-bold text-rose-600 mb-12"
        >
          I like you ❤️
        </motion.h1>

        <div className="flex gap-8 items-center justify-center">
          <motion.button
            animate={{ scale: yesScale }}
            whileHover={{ scale: yesScale * 1.05 }}
            whileTap={{ scale: yesScale * 0.95 }}
            onClick={onYes}
            className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-12 py-6 rounded-full text-2xl font-bold shadow-2xl hover:shadow-3xl transition-shadow"
            style={{
              transformOrigin: 'center',
            }}
          >
            Yes 😊
          </motion.button>

          <motion.button
            animate={{
              x: noPosition.x,
              y: noPosition.y,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNoClick}
            className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            no
          </motion.button>
        </div>

        {noClickCount > 0 && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-rose-500 text-xl font-medium"
          >
            {noClickCount === 1 && "Are you sure? 🥺"}
            {noClickCount === 2 && "Please reconsider... 💕"}
            {noClickCount === 3 && "The YES button is getting bigger! 😄"}
            {noClickCount >= 4 && "Just click YES already! 💝"}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
