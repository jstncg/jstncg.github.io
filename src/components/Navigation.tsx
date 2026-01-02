import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAudio } from '../contexts/AudioContext';

const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Writing', path: '/writing' },
] as const;

const THEMES = ['default', 'light', 'blue', 'burgundy', 'lavender'] as const;
type Theme = typeof THEMES[number];

const ITEM_WIDTH = 80;
const ITEM_HEIGHT = 36;
const GAP = 6;
const RIGHT_ITEM_WIDTH = 40;
const FADE_DELAY_PAUSED = 6000;
const FADE_DELAY_ENDED = 2000;

const PlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

export default function Navigation(): JSX.Element {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lastHoveredIndex, setLastHoveredIndex] = useState(0);
  const [rightHoveredIndex, setRightHoveredIndex] = useState<number | null>(null);
  const [theme, setTheme] = useState<Theme>('default');
  const [audioButtonOpacity, setAudioButtonOpacity] = useState(0);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { pathname } = useLocation();
  const { playingFile, isPaused, togglePlayPause } = useAudio();

  const isOnMusicPage = pathname === '/about/music';
  const hasActiveAudio = playingFile !== null;
  const shouldShowButton = hasActiveAudio && !isOnMusicPage;

  // Track last hovered position so highlight stays in place when fading
  useEffect(() => {
    if (hoveredIndex !== null) setLastHoveredIndex(hoveredIndex);
  }, [hoveredIndex]);

  // Handle audio button fade timing
  useEffect(() => {
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);

    if (shouldShowButton) {
      setAudioButtonOpacity(1);
      if (isPaused) {
        fadeTimeoutRef.current = setTimeout(() => setAudioButtonOpacity(0), FADE_DELAY_PAUSED);
      }
    } else if (!hasActiveAudio && audioButtonOpacity > 0) {
      fadeTimeoutRef.current = setTimeout(() => setAudioButtonOpacity(0), FADE_DELAY_ENDED);
    } else {
      setAudioButtonOpacity(0);
    }

    return () => { if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current); };
  }, [shouldShowButton, isPaused, hasActiveAudio]);

  // Apply theme class
  useEffect(() => {
    const themeClasses = THEMES.filter(t => t !== 'default').map(t => `theme-${t}`);
    document.documentElement.classList.remove(...themeClasses);
    if (theme !== 'default') document.documentElement.classList.add(`theme-${theme}`);
  }, [theme]);

  const getHighlightLeft = useCallback(() => {
    const index = hoveredIndex ?? lastHoveredIndex;
    return index * (ITEM_WIDTH + GAP) + 3;
  }, [hoveredIndex, lastHoveredIndex]);

  const toggleTheme = useCallback(() => {
    setTheme(current => {
      const currentIndex = THEMES.indexOf(current);
      return THEMES[(currentIndex + 1) % THEMES.length];
    });
  }, []);

  const highlightStyle = {
    width: ITEM_WIDTH - 6,
    height: ITEM_HEIGHT - 6,
    top: '50%',
    transform: 'translateY(-50%)',
  } as const;

  const rightHighlightStyle = {
    width: RIGHT_ITEM_WIDTH - 6,
    height: ITEM_HEIGHT - 6,
    top: '50%',
    transform: 'translateY(-50%)',
  } as const;

  return (
    <nav className="w-full max-w-content mx-auto px-4 md:px-6 pt-6 pb-4 flex items-center justify-between">
      {/* Left nav */}
      <div 
        className="relative flex items-center -ml-3"
        style={{ gap: GAP }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div 
          className={`absolute nav-highlight rounded pointer-events-none transition-all duration-200 ease-out ${hoveredIndex !== null ? 'opacity-100' : 'opacity-0'}`}
          style={{ ...highlightStyle, left: getHighlightLeft() }}
        />
        {NAV_ITEMS.map((item, index) => (
          <Link
            key={item.name}
            to={item.path}
            onMouseEnter={() => setHoveredIndex(index)}
            className={`relative z-10 flex items-center justify-center text-[length:var(--font-size-h3)] transition-opacity duration-200 ease-out ${hoveredIndex === index ? 'opacity-100' : 'opacity-50'}`}
            style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }}
          >
            {item.name}
          </Link>
        ))}
      </div>
      
      {/* Right nav */}
      <div className="relative flex items-center">
        {/* Audio control */}
        <button
          onClick={togglePlayPause}
          onMouseEnter={() => audioButtonOpacity > 0 && setRightHoveredIndex(0)}
          onMouseLeave={() => setRightHoveredIndex(null)}
          className="absolute z-10 flex items-center justify-center text-text transition-opacity duration-500 ease-out"
          style={{ 
            width: RIGHT_ITEM_WIDTH,
            height: ITEM_HEIGHT,
            right: RIGHT_ITEM_WIDTH + GAP,
            top: '50%',
            transform: 'translateY(-50%)',
            opacity: audioButtonOpacity * (rightHoveredIndex === 0 ? 1 : 0.5),
            pointerEvents: audioButtonOpacity > 0 ? 'auto' : 'none',
          }}
        >
          {isPaused ? <PlayIcon /> : <PauseIcon />}
        </button>
        <div 
          className={`absolute nav-highlight rounded pointer-events-none transition-opacity duration-200 ease-out ${rightHoveredIndex === 0 && audioButtonOpacity > 0 ? 'opacity-100' : 'opacity-0'}`}
          style={{ ...rightHighlightStyle, right: RIGHT_ITEM_WIDTH + GAP + 3 }}
        />

        {/* Theme toggle */}
        <div 
          className={`absolute nav-highlight rounded pointer-events-none transition-opacity duration-200 ease-out ${rightHoveredIndex === 1 ? 'opacity-100' : 'opacity-0'}`}
          style={{ ...rightHighlightStyle, right: 3 }}
        />
        <button
          onClick={toggleTheme}
          onMouseEnter={() => setRightHoveredIndex(1)}
          onMouseLeave={() => setRightHoveredIndex(null)}
          className={`relative z-10 flex items-center justify-center text-[length:var(--font-size-h3)] transition-opacity duration-200 ease-out ${rightHoveredIndex === 1 ? 'opacity-100' : 'opacity-50'}`}
          style={{ width: RIGHT_ITEM_WIDTH, height: ITEM_HEIGHT }}
        >
          [j]
        </button>
      </div>
    </nav>
  );
}
