import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemoryGameProps {
  onComplete: () => void;
}

const emojis = ['❤️', '💘', '💖', '💗', '💝', '💌', '💕', '💞'];

const icons = emojis.map(emoji => ({ emoji }));

interface Card {
  id: number;
  iconIndex: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryGame({ onComplete }: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const shuffledCards = [...icons, ...icons]
      .map((_, index) => ({
        id: index,
        iconIndex: index % icons.length,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
  }, []);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [first, second] = flippedIndices;

      if (cards[first].iconIndex === cards[second].iconIndex) {
        setTimeout(() => {
          setCards(prev =>
            prev.map((card, idx) =>
              idx === first || idx === second
                ? { ...card, isMatched: true }
                : card
            )
          );
          setFlippedIndices([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map((card, idx) =>
              idx === first || idx === second
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedIndices([]);
        }, 800);
      }
    }
  }, [flippedIndices, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setTimeout(() => {
        onComplete();
      }, 800);
    }
  }, [cards, onComplete]);

  const handleCardClick = (index: number) => {
    if (
      flippedIndices.length === 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    ) {
      return;
    }

    setCards(prev =>
      prev.map((card, idx) =>
        idx === index ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedIndices(prev => [...prev, index]);
    setMoves(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-red-100 flex flex-col items-center justify-center p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold text-rose-600 mb-2">
          Memory Game
        </h2>
        <p className="text-lg text-rose-500">
          Match all pairs 💖 | Moves: {moves}
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-6 sm:gap-8 max-w-4xl">
        <AnimatePresence>
          {cards.map((card, index) => {
            const { emoji } = icons[card.iconIndex];

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.04 }}
                className="aspect-square w-24 h-24 sm:w-28 sm:h-28"
              >
                <motion.button
                  onClick={() => handleCardClick(index)}
                  className="w-full h-full relative"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{
                    rotateY: card.isFlipped || card.isMatched ? 180 : 0,
                    scale: card.isMatched ? 0.95 : 1,
                  }}
                  transition={{ duration: 0.6 }}
                  disabled={card.isMatched}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl shadow-lg flex items-center justify-center"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <span className="text-5xl">💕</span>
                  </div>

                  {/* Back */}
                  <div
                    className={`absolute inset-0 rounded-xl shadow-lg flex items-center justify-center ${
                      card.isMatched
                        ? 'bg-gradient-to-br from-green-100 to-emerald-100'
                        : 'bg-white'
                    }`}
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <span className="text-6xl">{emoji}</span>
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
