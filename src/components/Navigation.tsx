import { useState } from 'react';
import { Link } from 'react-router-dom';

const navItems = [
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Writing', path: '/writing' },
];

const ITEM_WIDTH = 80;
const ITEM_HEIGHT = 36;
const GAP = 6;

export default function Navigation(): JSX.Element {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [homeHovered, setHomeHovered] = useState(false);

  const getHighlightLeft = (): number => {
    if (hoveredIndex === null) return 0;
    return hoveredIndex * (ITEM_WIDTH + GAP) + 3;
  };

  return (
    <nav className="w-full max-w-content mx-auto px-4 md:px-6 pt-6 pb-4 flex items-center justify-between">
      <Link 
        to="/"
        className="relative flex items-center justify-center transition-all duration-200 ease-out -ml-3"
        style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }}
        onMouseEnter={() => setHomeHovered(true)}
        onMouseLeave={() => setHomeHovered(false)}
      >
        <span className={`relative z-10 text-[length:var(--font-size-h3)] transition-opacity duration-200 ease-out ${homeHovered ? 'opacity-100' : 'opacity-60'}`}>
          Home
        </span>
        <div 
          className={`absolute bg-[#222327] rounded transition-opacity duration-200 ease-out ${homeHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{ width: ITEM_WIDTH - 6, height: ITEM_HEIGHT - 6 }}
        />
      </Link>
      
      <div 
        className="relative flex items-center"
        style={{ gap: GAP }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div 
          className={`absolute bg-[#222327] rounded pointer-events-none transition-all duration-200 ease-out ${hoveredIndex !== null ? 'opacity-100' : 'opacity-0'}`}
          style={{
            left: getHighlightLeft(),
            width: ITEM_WIDTH - 6,
            height: ITEM_HEIGHT - 6,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
        
        {navItems.map((item, index) => (
          <Link
            key={item.name}
            to={item.path}
            onMouseEnter={() => setHoveredIndex(index)}
            className={`relative z-10 flex items-center justify-center text-[length:var(--font-size-h3)] transition-opacity duration-200 ease-out ${hoveredIndex === index ? 'opacity-100' : 'opacity-60'}`}
            style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
