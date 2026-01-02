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

const ITEM_HEIGHT = 36;
const ITEM_PADDING = 14;
const RIGHT_ITEM_WIDTH = 40;
const RIGHT_GAP = 6;
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
  const [lastRightHoveredIndex, setLastRightHoveredIndex] = useState(0);
  const [theme, setTheme] = useState<Theme>('default');
  const [audioButtonOpacity, setAudioButtonOpacity] = useState(0);
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });
  const [rightHighlightPos, setRightHighlightPos] = useState({ left: 0, width: 0 });
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const rightNavItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const { pathname } = useLocation();
  const { playingFile, isPaused, togglePlayPause } = useAudio();

  const isOnMusicPage = pathname === '/about/music';
  const hasActiveAudio = playingFile !== null;
  const shouldShowButton = hasActiveAudio && !isOnMusicPage;

  // Track last hovered position and update highlight style for left nav
  useEffect(() => {
    if (hoveredIndex !== null) setLastHoveredIndex(hoveredIndex);
  }, [hoveredIndex]);

  useEffect(() => {
    const index = hoveredIndex ?? lastHoveredIndex;
    const el = navItemsRef.current[index];
    if (el) {
      setHighlightStyle({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [hoveredIndex, lastHoveredIndex]);

  // Track last hovered position and update highlight style for right nav
  useEffect(() => {
    if (rightHoveredIndex !== null) setLastRightHoveredIndex(rightHoveredIndex);
  }, [rightHoveredIndex]);

  useEffect(() => {
    const index = rightHoveredIndex ?? lastRightHoveredIndex;
    const el = rightNavItemsRef.current[index];
    if (el) {
      setRightHighlightPos({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [rightHoveredIndex, lastRightHoveredIndex]);

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

  const toggleTheme = useCallback(() => {
    setTheme(current => {
      const currentIndex = THEMES.indexOf(current);
      return THEMES[(currentIndex + 1) % THEMES.length];
    });
  }, []);

  const navHighlightStyle = {
    width: highlightStyle.width,
    height: ITEM_HEIGHT - 6,
    left: highlightStyle.left,
    top: '50%',
    transform: 'translateY(-50%)',
  } as const;

  const rightHighlightStyle = {
    width: rightHighlightPos.width,
    height: ITEM_HEIGHT - 6,
    left: rightHighlightPos.left,
    top: '50%',
    transform: 'translateY(-50%)',
  } as const;

  return (
    <nav className="w-full max-w-content mx-auto px-4 md:px-6 pt-6 pb-4 flex items-center justify-between">
      {/* Left nav - [j] and audio controls */}
      <div 
        className="relative flex items-center -ml-3"
        style={{ gap: RIGHT_GAP }}
        onMouseLeave={() => setRightHoveredIndex(null)}
      >
        {/* Single sliding highlight for left nav */}
        <div 
          className={`absolute nav-highlight rounded pointer-events-none transition-all duration-200 ease-out ${rightHoveredIndex !== null ? 'opacity-100' : 'opacity-0'}`}
          style={rightHighlightStyle}
        />
        
        {/* Theme toggle */}
        <button
          ref={el => rightNavItemsRef.current[0] = el}
          onClick={toggleTheme}
          onMouseEnter={() => setRightHoveredIndex(0)}
          className={`relative z-10 flex items-center justify-center text-[length:var(--font-size-h3)] transition-opacity duration-200 ease-out ${rightHoveredIndex === 0 ? 'opacity-100' : 'opacity-50'}`}
          style={{ width: RIGHT_ITEM_WIDTH, height: ITEM_HEIGHT }}
        >
          [j]
        </button>

        {/* Audio control */}
        <button
          ref={el => rightNavItemsRef.current[1] = el}
          onClick={togglePlayPause}
          onMouseEnter={() => audioButtonOpacity > 0 && setRightHoveredIndex(1)}
          className={`relative z-10 flex items-center justify-center text-text transition-opacity duration-500 ease-out ${rightHoveredIndex === 1 ? 'opacity-100' : 'opacity-50'}`}
          style={{ 
            width: RIGHT_ITEM_WIDTH,
            height: ITEM_HEIGHT,
            opacity: audioButtonOpacity * (rightHoveredIndex === 1 ? 1 : 0.5),
            pointerEvents: audioButtonOpacity > 0 ? 'auto' : 'none',
          }}
        >
          {isPaused ? <PlayIcon /> : <PauseIcon />}
        </button>
      </div>
      
      {/* Right nav - Home, About, Writing */}
      <div 
        className="relative flex items-center -mr-3"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div 
          className={`absolute nav-highlight rounded pointer-events-none transition-all duration-200 ease-out ${hoveredIndex !== null ? 'opacity-100' : 'opacity-0'}`}
          style={navHighlightStyle}
        />
        {NAV_ITEMS.map((item, index) => (
          <Link
            key={item.name}
            ref={el => navItemsRef.current[index] = el}
            to={item.path}
            onMouseEnter={() => setHoveredIndex(index)}
            className={`relative z-10 flex items-center justify-center text-[length:var(--font-size-h3)] transition-opacity duration-200 ease-out ${hoveredIndex === index ? 'opacity-100' : 'opacity-50'}`}
            style={{ height: ITEM_HEIGHT, paddingLeft: ITEM_PADDING, paddingRight: ITEM_PADDING }}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
