import { useState } from 'react';
import { Link } from 'react-router-dom';

const aboutItems = [
  { label: 'My life thus far', path: '/about/life' },
  { label: 'Principles', path: '/about/quotes' },
  { label: 'Favorite media', path: '/about/music' },
  { label: 'Reading list', path: '/about/reading' },
  { label: 'Thoughts', path: '/about/thoughts' },
];

export default function About(): JSX.Element {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex-1 flex flex-col pt-[100px]">
      <h1 className="font-[580] text-text mb-6">About</h1>
      <div className="flex flex-col w-full -mt-2" onMouseLeave={() => setHoveredIndex(null)}>
        {aboutItems.map((item, index) => (
          <div key={item.path}>
            <div className="border-t border-custom-border" />
            <Link
              to={item.path}
              onMouseEnter={() => setHoveredIndex(index)}
              className={`block text-left px-0 py-2.5 w-full transition-all duration-200 ease-out cursor-pointer text-[length:var(--font-size-h3)] text-text ${
                hoveredIndex === index ? 'opacity-100' : hoveredIndex !== null ? 'opacity-30' : 'opacity-100'
              }`}
            >
              {item.label}
            </Link>
            {index === aboutItems.length - 1 && <div className="border-t border-custom-border" />}
          </div>
        ))}
      </div>
    </div>
  );
}
