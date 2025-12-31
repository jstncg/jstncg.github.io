import { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Writing', path: '/writing' },
];

// Fixed dimensions for consistent sizing
const ITEM_WIDTH = 70; // px - width for each nav item
const ITEM_HEIGHT = 36; // px - height for each nav item
const GAP = 4; // px - gap between items

export default function Navigation(): JSX.Element {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [homeHovered, setHomeHovered] = useState(false);

  const handleMouseEnter = (index: number): void => {
    setHoveredIndex(index);
  };

  const handleContainerLeave = (): void => {
    setHoveredIndex(null);
  };

  // Calculate highlight position based on index
  const getHighlightLeft = (): number => {
    if (hoveredIndex === null) return 0;
    return hoveredIndex * (ITEM_WIDTH + GAP) + 3;
  };

  return (
    <nav className="w-full max-w-content mx-auto px-4 md:px-6 pt-6 pb-4 flex items-center justify-between">
      {/* Left: Home link with independent hover */}
      <Link 
        to="/"
        className="relative flex items-center justify-center transition-all duration-200 ease-out -ml-3"
        style={{
          width: ITEM_WIDTH,
          height: ITEM_HEIGHT,
        }}
        onMouseEnter={() => setHomeHovered(true)}
        onMouseLeave={() => setHomeHovered(false)}
      >
        <span 
          className={`relative z-10 text-[length:var(--font-size-h3)] transition-opacity duration-200 ease-out ${
            homeHovered ? 'opacity-100' : 'opacity-60'
          }`}
        >
          Home
        </span>
        <div 
          className={`absolute bg-[#222327] rounded transition-opacity duration-200 ease-out ${
            homeHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            width: ITEM_WIDTH - 6,
            height: ITEM_HEIGHT - 6,
          }}
        />
      </Link>
      
      {/* Right: Nav items with sliding pill */}
      <div 
        className="relative flex items-center"
        style={{ gap: GAP }}
        onMouseLeave={handleContainerLeave}
      >
        {/* The sliding highlight pill */}
        <div 
          className={`absolute bg-[#222327] rounded pointer-events-none transition-all duration-200 ease-out ${
            hoveredIndex !== null ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            left: getHighlightLeft(),
            width: ITEM_WIDTH - 6,
            height: ITEM_HEIGHT - 6,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
        
        {/* Nav items */}
        {navItems.map((item, index) => (
          <Link
            key={item.name}
            to={item.path}
            onMouseEnter={() => handleMouseEnter(index)}
            className={`relative z-10 flex items-center justify-center text-[length:var(--font-size-h3)] transition-opacity duration-200 ease-out ${
              hoveredIndex === index ? 'opacity-100' : 'opacity-60'
            }`}
            style={{
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

