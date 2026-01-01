import { useState, useEffect, useRef, useCallback, KeyboardEvent } from 'react';

type GameState = 'ready' | 'running' | 'finished';
type CharState = 'correct' | 'incorrect';

const WORD_BANK = [
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had',
  'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his',
  'how', 'its', 'may', 'new', 'now', 'old', 'see', 'way', 'who', 'boy',
  'did', 'own', 'say', 'she', 'too', 'use', 'run', 'put', 'set', 'try',
  'that', 'with', 'have', 'this', 'will', 'your', 'from', 'they', 'been',
  'call', 'come', 'each', 'find', 'give', 'good', 'help', 'here', 'just',
  'know', 'last', 'life', 'look', 'make', 'more', 'much', 'name', 'need',
  'over', 'part', 'take', 'than', 'them', 'then', 'turn', 'want', 'well',
  'work', 'year', 'back', 'down', 'even', 'most', 'only', 'when', 'also',
  'about', 'after', 'again', 'being', 'could', 'every', 'first', 'found',
  'great', 'house', 'large', 'learn', 'never', 'other', 'place', 'plant',
  'point', 'right', 'small', 'sound', 'still', 'study', 'their', 'there',
  'these', 'thing', 'think', 'three', 'water', 'where', 'which', 'world',
  'would', 'write', 'years', 'young', 'going', 'group', 'under', 'might',
  'before', 'change', 'follow', 'little', 'number', 'people', 'school',
  'should', 'simple', 'system', 'though', 'around', 'better', 'during',
  'family', 'always', 'became', 'become', 'called', 'mother', 'father',
  'another', 'because', 'between', 'country', 'develop', 'general',
  'however', 'morning', 'nothing', 'picture', 'problem', 'program',
  'children', 'continue', 'everyone', 'following', 'interest', 'national',
  'possible', 'question', 'remember', 'something', 'together', 'business'
];

const generateWords = (count: number = 100, existingWords: string[] = []): string[] => {
  const result: string[] = [];
  const usedInWindow = new Set<string>(existingWords.slice(-20));
  
  for (let i = 0; i < count; i++) {
    let word: string;
    let attempts = 0;
    
    do {
      word = WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
      attempts++;
    } while (usedInWindow.has(word) && attempts < 50);
    
    result.push(word);
    usedInWindow.add(word);
    
    if (usedInWindow.size > 20) {
      const oldestWord = result[Math.max(0, result.length - 21)];
      if (oldestWord) usedInWindow.delete(oldestWord);
    }
  }
  
  return result;
};

export default function TypingTest(): JSX.Element {
  const [words, setWords] = useState<string[]>(() => generateWords(100));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [charStates, setCharStates] = useState<Record<string, CharState>>({});
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState<GameState>('ready');
  const [stats, setStats] = useState({ correctChars: 0, incorrectChars: 0, wordsCompleted: 0 });
  const [firstVisibleWordIndex, setFirstVisibleWordIndex] = useState(0);
  const [cursorShouldBlink, setCursorShouldBlink] = useState(true);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const wordRefs = useRef<Record<number, HTMLSpanElement>>({});
  const blinkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (gameState !== 'running') return;
    if (timeLeft <= 0) {
      setGameState('finished');
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  useEffect(() => {
    if (gameState === 'ready' || gameState === 'running') {
      inputRef.current?.focus();
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'ready') {
      setCursorShouldBlink(true);
      return;
    }
    
    if (gameState === 'running') {
      setCursorShouldBlink(false);
      if (blinkTimeoutRef.current) clearTimeout(blinkTimeoutRef.current);
      blinkTimeoutRef.current = setTimeout(() => setCursorShouldBlink(true), 2000);
    }
    
    return () => {
      if (blinkTimeoutRef.current) clearTimeout(blinkTimeoutRef.current);
    };
  }, [gameState, currentCharIndex, currentWordIndex]);

  useEffect(() => {
    if (gameState !== 'running' && gameState !== 'ready') return;
    if (currentCharIndex === 0) return;
    
    const currentWordEl = wordRefs.current[currentWordIndex];
    if (!currentWordEl) return;
    
    const rowYPositions: number[] = [];
    const wordToRow = new Map<number, number>();
    
    for (let i = firstVisibleWordIndex; i <= currentWordIndex + 10; i++) {
      const wordEl = wordRefs.current[i];
      if (!wordEl) continue;
      
      const wordY = Math.round(wordEl.getBoundingClientRect().top);
      let rowIndex = rowYPositions.findIndex(y => Math.abs(y - wordY) < 5);
      if (rowIndex === -1) {
        rowIndex = rowYPositions.length;
        rowYPositions.push(wordY);
      }
      wordToRow.set(i, rowIndex);
    }
    
    const currentWordRow = wordToRow.get(currentWordIndex);
    if (currentWordRow !== undefined && currentWordRow >= 2) {
      let newFirstIndex = firstVisibleWordIndex;
      for (let i = firstVisibleWordIndex; i < currentWordIndex; i++) {
        const wordRow = wordToRow.get(i);
        if (wordRow !== undefined && wordRow >= 1) {
          newFirstIndex = i;
          break;
        }
      }
      if (newFirstIndex !== firstVisibleWordIndex) {
        setFirstVisibleWordIndex(newFirstIndex);
      }
    }
  }, [currentWordIndex, currentCharIndex, gameState, firstVisibleWordIndex]);

  useEffect(() => {
    if (currentWordIndex > words.length - 30) {
      setWords(prev => [...prev, ...generateWords(50, prev)]);
    }
  }, [currentWordIndex, words.length]);

  const resetGame = (): void => {
    setWords(generateWords(100));
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setCharStates({});
    setTimeLeft(30);
    setStats({ correctChars: 0, incorrectChars: 0, wordsCompleted: 0 });
    setFirstVisibleWordIndex(0);
    setCursorShouldBlink(true);
    setGameState('ready');
    wordRefs.current = {};
    if (blinkTimeoutRef.current) clearTimeout(blinkTimeoutRef.current);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>): void => {
    if (gameState === 'finished') return;

    const currentWord = words[currentWordIndex];
    if (!currentWord) return;

    if (gameState === 'ready' && e.key.length === 1 && e.key !== ' ') {
      setGameState('running');
    }

    if (e.key === 'Backspace') {
      e.preventDefault();
      if (currentCharIndex > 0) {
        const key = `${currentWordIndex}-${currentCharIndex - 1}`;
        setCharStates((prev) => {
          const newStates = { ...prev };
          delete newStates[key];
          return newStates;
        });
        setCurrentCharIndex((prev) => prev - 1);
      } else if (currentWordIndex > 0 && currentWordIndex > firstVisibleWordIndex) {
        const prevWord = words[currentWordIndex - 1];
        setCurrentWordIndex((prev) => prev - 1);
        setCurrentCharIndex(prevWord.length);
        setStats((prev) => ({ ...prev, wordsCompleted: Math.max(0, prev.wordsCompleted - 1) }));
      }
      return;
    }

    if (e.key === ' ') {
      e.preventDefault();
      if (currentCharIndex > 0) {
        setStats((prev) => ({ ...prev, wordsCompleted: prev.wordsCompleted + 1 }));
        setCurrentWordIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }
      return;
    }

    if (e.key.length !== 1) return;
    if (gameState !== 'running' && gameState !== 'ready') return;

    const expectedChar = currentWord[currentCharIndex];
    if (!expectedChar) return;

    const key = `${currentWordIndex}-${currentCharIndex}`;
    const isCorrect = e.key === expectedChar;

    setCharStates((prev) => ({ ...prev, [key]: isCorrect ? 'correct' : 'incorrect' }));
    setStats((prev) => ({
      ...prev,
      correctChars: prev.correctChars + (isCorrect ? 1 : 0),
      incorrectChars: prev.incorrectChars + (isCorrect ? 0 : 1),
    }));
    setCurrentCharIndex((prev) => prev + 1);
  }, [gameState, words, currentWordIndex, currentCharIndex, firstVisibleWordIndex]);

  const wpm = Math.round((stats.correctChars / 5) * 2);
  const accuracy = stats.correctChars + stats.incorrectChars > 0
    ? Math.round((stats.correctChars / (stats.correctChars + stats.incorrectChars)) * 100)
    : 0;

  const renderWord = (word: string, wordIndex: number): JSX.Element => {
    const isCurrentWord = wordIndex === currentWordIndex;
    const showCursorAfterWord = isCurrentWord && currentCharIndex === word.length && (gameState === 'running' || gameState === 'ready');
    
    return (
      <span 
        key={wordIndex} 
        ref={el => { if (el) wordRefs.current[wordIndex] = el; }}
        className="mr-3 inline-block relative"
      >
        {word.split('').map((char, charIndex) => {
          const key = `${wordIndex}-${charIndex}`;
          const state = charStates[key];
          const isCurrent = isCurrentWord && charIndex === currentCharIndex;
          
          let className = 'relative transition-colors duration-75';
          if (state === 'correct') className += ' text-white';
          else if (state === 'incorrect') className += ' text-red-500';
          else className += ' text-white/20';

          return (
            <span key={charIndex} className={className}>
              {isCurrent && (gameState === 'running' || gameState === 'ready') && (
                <span className={`absolute -left-[1px] top-1/2 -translate-y-1/2 w-[1.5px] h-[0.9em] bg-white rounded-sm z-10 ${cursorShouldBlink ? 'typing-cursor' : ''}`} />
              )}
              {char}
            </span>
          );
        })}
        {showCursorAfterWord && (
          <span className={`absolute -right-1 top-1/2 -translate-y-1/2 w-[1.5px] h-[0.9em] bg-white rounded-sm z-10 ${cursorShouldBlink ? 'typing-cursor' : ''}`} />
        )}
      </span>
    );
  };

  const wordsToRender = words.slice(firstVisibleWordIndex, firstVisibleWordIndex + 60);

  return (
    <section className="mb-[60px]">
      <h2 className="font-semibold text-text mb-3">Race Me</h2>
      
      <div 
        className="bg-[#1e1f23] rounded-lg p-6 pb-8 border border-[#2a2b30] relative overflow-hidden min-h-[140px]"
        onClick={() => (gameState === 'running' || gameState === 'ready') && inputRef.current?.focus()}
      >
        <input
          ref={inputRef}
          type="text"
          className="absolute opacity-0 pointer-events-none"
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
        />

        {gameState !== 'finished' && (
          <div className="absolute top-2 right-3 text-xs text-white/50">{timeLeft}s</div>
        )}

        {(gameState === 'ready' || gameState === 'running') && (
          <div className="text-[length:var(--font-size-h2)] leading-relaxed h-[90px] overflow-hidden pl-1">
            {wordsToRender.map((word, idx) => renderWord(word, firstVisibleWordIndex + idx))}
          </div>
        )}

        {gameState === 'finished' && (
          <div className="flex items-center justify-center h-[90px]">
            <div className="flex justify-center gap-12">
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">WPM</p>
                <p className="text-[length:var(--font-size-h2)] font-normal text-white">{wpm}</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Accuracy</p>
                <p className="text-[length:var(--font-size-h2)] font-normal text-white">{accuracy}%</p>
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={resetGame}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/60 transition-colors duration-200"
          title="Restart test"
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 2v6h-6" />
            <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
            <path d="M3 22v-6h6" />
            <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          </svg>
        </button>
      </div>
    </section>
  );
}
