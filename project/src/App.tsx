import { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import MemoryGame from './components/MemoryGame';
import FinalQuestion from './components/FinalQuestion';
import FinalReveal from './components/FinalReveal';

type Screen = 'intro' | 'game' | 'question' | 'reveal';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('intro');

  return (
    <>
      {currentScreen === 'intro' && (
        <IntroScreen onStart={() => setCurrentScreen('game')} />
      )}
      {currentScreen === 'game' && (
        <MemoryGame onComplete={() => setCurrentScreen('question')} />
      )}
      {currentScreen === 'question' && (
        <FinalQuestion onYes={() => setCurrentScreen('reveal')} />
      )}
      {currentScreen === 'reveal' && <FinalReveal />}
    </>
  );
}

export default App;
