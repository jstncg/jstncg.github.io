import { useState } from 'react';
import { Link } from 'react-router-dom';
import TypingTest from '../components/TypingTest';

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const writingItems = [
  { label: 'piece 1', path: '/writing/piece-1', date: '2025-08-12' },
  { label: 'piece 2', path: '/writing/piece-2', date: '2025-06-23' },
  { label: 'piece 3', path: '/writing/piece-3', date: '2025-04-05' },
  { label: 'piece 4', path: '/writing/piece-4', date: '2025-02-19' },
  { label: 'piece 5', path: '/writing/piece-5', date: '2025-01-08' },
];

export default function Writing(): JSX.Element {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex-1 flex flex-col pt-[100px]">
      <h1 className="font-[580] text-text mb-6">Writing</h1>
      <div className="flex flex-col w-full -mt-2" onMouseLeave={() => setHoveredIndex(null)}>
        {writingItems.map((item, index) => (
          <div key={item.path}>
            <div className="border-t border-custom-border" />
            <Link
              to={item.path}
              onMouseEnter={() => setHoveredIndex(index)}
              className={`flex justify-between items-center text-left px-0 py-2.5 w-full transition-all duration-200 ease-out cursor-pointer text-[length:var(--font-size-h3)] text-text ${
                hoveredIndex === index ? 'opacity-100' : hoveredIndex !== null ? 'opacity-30' : 'opacity-100'
              }`}
            >
              <span>{item.label}</span>
              <span className="text-[length:var(--font-size-body)] opacity-50">{formatDate(item.date)}</span>
            </Link>
            {index === writingItems.length - 1 && <div className="border-t border-custom-border" />}
          </div>
        ))}
      </div>

      <div className="mt-10">
        <TypingTest />
      </div>
    </div>
  );
}
