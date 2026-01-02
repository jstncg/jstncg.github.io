import { useState } from 'react';

interface BookItem {
  title: string;
  author: string;
}

const readingItems: BookItem[] = [
  { title: 'Norwegian Wood', author: 'Haruki Murakami' },
];

const upNextItems: BookItem[] = [
  { title: 'Barbarians at the Gate', author: 'Bryan Burrough & John Helyar' },
  { title: 'Zero to One', author: 'Peter Thiel' },
  { title: 'Steve Jobs', author: 'Walter Isaacson' },
  { title: 'Elon Musk', author: 'Walter Isaacson' },
  { title: 'Crime and Punishment', author: 'Fyodor Dostoevsky' },
  { title: 'Moby Dick', author: 'Herman Melville' },
  { title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky' },
  { title: 'The Iliad', author: 'Homer' },
  { title: 'The Odyssey', author: 'Homer' },
  { title: 'Don Quixote', author: 'Miguel de Cervantes' },
  { title: 'The Divine Comedy', author: 'Dante Alighieri' },
  { title: 'Notes from Underground', author: 'Fyodor Dostoevsky' },
  { title: 'The Trial', author: 'Franz Kafka' },
  { title: 'Ulysses', author: 'James Joyce' },
  { title: 'War and Peace', author: 'Leo Tolstoy' },
  { title: 'Blood Meridian', author: 'Cormac McCarthy' },
  { title: 'Anna Karenina', author: 'Leo Tolstoy' },
  { title: 'Industrial Society and Its Future', author: 'Ted Kaczynski' },
  { title: 'Infinite Jest', author: 'David Foster Wallace' },
  { title: 'The Idiot', author: 'Fyodor Dostoevsky' },
  { title: 'Paradise Lost', author: 'John Milton' },
  { title: 'Dao De Jing', author: 'Laozi' },
];

const completedItems: BookItem[] = [
  { title: 'The Stranger', author: 'Albert Camus' },
  { title: 'No Longer Human', author: 'Osamu Dazai' },
  { title: 'Kafka on the Shore', author: 'Haruki Murakami' },
  { title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky' },
  { title: 'Sputnik Sweetheart', author: 'Haruki Murakami' },
  { title: 'The Metamorphosis', author: 'Franz Kafka' },
];

interface BookListProps {
  items: BookItem[];
  hoveredItem: string | null;
  onHover: (title: string | null) => void;
}

function BookList({ items, hoveredItem, onHover }: BookListProps) {
  return (
    <ul className="space-y-2 mb-8" onMouseLeave={() => onHover(null)}>
      {items.map((item) => (
        <li
          key={item.title}
          className={`text-[length:var(--font-size-h3)] flex items-center gap-4 transition-all duration-200 ease-out ${
            hoveredItem && hoveredItem !== item.title ? 'opacity-30' : 'opacity-100'
          }`}
          onMouseEnter={() => onHover(item.title)}
        >
          <span className="flex items-center whitespace-nowrap">
            <span className="mr-2">•</span>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(item.title + ' ' + item.author + ' book')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="slide-underline"
            >
              {item.title}
            </a>
          </span>
          <div className="flex-1 border-b border-dashed" style={{ borderColor: 'var(--dotted-line)' }} />
          <span className="text-text opacity-50  whitespace-nowrap">{item.author}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ReadingList(): JSX.Element {
  const [hovered, setHovered] = useState<{ category: string; title: string } | null>(null);

  const createHoverHandler = (category: string) => 
    (title: string | null) => setHovered(title ? { category, title } : null);

  const getHoveredForCategory = (category: string) =>
    hovered?.category === category ? hovered.title : null;

  return (
    <div className="flex-1 flex flex-col pt-[100px]">
      <h1 className="font-[580] text-text mb-6">Reading list</h1>

      <div className="text-text">
        <h3 className="font-normal mb-3 opacity-50">Reading</h3>
        <BookList
          items={readingItems}
          hoveredItem={getHoveredForCategory('reading')}
          onHover={createHoverHandler('reading')}
        />

        <h3 className="font-normal mb-3 opacity-50">Completed</h3>
        <BookList
          items={completedItems}
          hoveredItem={getHoveredForCategory('completed')}
          onHover={createHoverHandler('completed')}
        />

        <h3 className="font-normal mb-3 opacity-50">Up Next</h3>
        <BookList
          items={upNextItems}
          hoveredItem={getHoveredForCategory('upnext')}
          onHover={createHoverHandler('upnext')}
        />
      </div>
    </div>
  );
}
