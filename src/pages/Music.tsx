import { useState, useCallback } from 'react';
import { useAudio } from '../contexts/AudioContext';

interface MediaItem {
  name: string;
  audioFile: string;
  startTime: number;
  searchSuffix: string;
}

const filmItems: MediaItem[] = [
  { name: 'Parasite', audioFile: '/audio/The Belt of Faith - jung jaeil.mp3', startTime: 0.5, searchSuffix: 'film' },
  { name: 'Oldboy', audioFile: '/audio/Old Boy OST - The Last Waltz - annie2907.mp3', startTime: 4, searchSuffix: 'film' },
  { name: 'La La Land', audioFile: '/audio/Mia and Sebastians Theme.mp3', startTime: 0, searchSuffix: 'film' },
  { name: 'End of Evangelion', audioFile: '/audio/Shiro Sagisu-Thanatos –If I Can\'t Be Yours– - Risking Dark.mp3', startTime: 0.5, searchSuffix: 'film' },
  { name: 'The Social Network', audioFile: '/audio/In Motion (HD) - From the Soundtrack to The Social Network - CookieAdventures.mp3', startTime: 0, searchSuffix: 'film' },
  { name: 'Fallen Angels', audioFile: '/audio/Fallen Angels - Thinking About You - He Zhiwu.mp3', startTime: 0, searchSuffix: 'film' },
  { name: 'Taxi Driver', audioFile: '/audio/Main Title (from Taxi Driver) - Bernard Herrmann.mp3', startTime: 0, searchSuffix: 'film' },
];

const musicItems: MediaItem[] = [
  { name: 'Alex G', audioFile: '/audio/Break - alex_g_offline.mp3', startTime: 1, searchSuffix: 'music' },
  { name: 'Bill Evans', audioFile: '/audio/Bill Evans Trio - My Foolish Heart (Official Visualizer) - Bill Evans.mp3', startTime: 1, searchSuffix: 'music' },
  { name: 'Lamp', audioFile: '/audio/6号室 - Lamp.mp3', startTime: 0, searchSuffix: 'music' },
  { name: 'Yoon Sang', audioFile: '/audio/Reunion - Yoon Sang.mp3', startTime: 0, searchSuffix: 'music' },
  { name: 'My Bloody Valentine', audioFile: '/audio/When You Sleep.mp3', startTime: 0, searchSuffix: 'music' },
  { name: 'Daniel Caesar', audioFile: '/audio/Daniel Caesar - Who Knows (432Hz Audio) - Univ3rsal Hz.mp3', startTime: 0.5, searchSuffix: 'music' },
  { name: 'Snow Strippers', audioFile: '/audio/Snow Strippers - Just Your Doll (Lyrics) - HyperTunes.mp3', startTime: 0, searchSuffix: 'music' },
  { name: 'Chet Baker', audioFile: '/audio/Chet Baker - I fall in love too easily - nadziejaszek.mp3', startTime: 0, searchSuffix: 'music' },
  { name: 'Tchaikovsky', audioFile: '/audio/The Nutcracker, Op. 71, Act 2 No. 14a, Pas de deux. Andante maestoso - Sir Simon Rattle.mp3', startTime: 0, searchSuffix: 'music' },
];

const gameItems: MediaItem[] = [
  { name: 'Persona 5 Royal', audioFile: '/audio/Beneath the Mask -instrumental version- - Lyn.mp3', startTime: 0.4, searchSuffix: 'game' },
  { name: 'NieR Replicant', audioFile: '/audio/カイネ_救済 - MONACA.mp3', startTime: 0.3, searchSuffix: 'game' },
  { name: 'Balatro', audioFile: '/audio/Balatro Main Theme - Balatro LouisF.mp3', startTime: 0, searchSuffix: 'game' },
  { name: 'Silent Hill 2', audioFile: '/audio/The Day Of Night - Akira Yamaoka.mp3', startTime: 0, searchSuffix: 'game' },
  { name: 'OMORI', audioFile: '/audio/OMORI OST - 172 DUET - OMOCAT.mp3', startTime: 1, searchSuffix: 'game' },
  { name: 'Ultrakill', audioFile: '/audio/Altars of Apostasy - Heaven Pierce Her.mp3', startTime: 0, searchSuffix: 'game' },
];

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

interface MediaListProps {
  items: MediaItem[];
  hoveredItem: string | null;
  onHover: (name: string | null) => void;
  onPlay: (audioFile: string, startTime: number) => void;
  isPlaying: (audioFile: string) => boolean;
}

function MediaList({ items, hoveredItem, onHover, onPlay, isPlaying }: MediaListProps) {
  return (
    <ul className="space-y-2 mb-8" onMouseLeave={() => onHover(null)}>
      {items.map((item) => (
        <li
          key={item.name}
          className={`text-[length:var(--font-size-h3)] flex items-center gap-4 transition-all duration-200 ease-out ${
            hoveredItem && hoveredItem !== item.name ? 'opacity-30' : 'opacity-100'
          }`}
          onMouseEnter={() => onHover(item.name)}
        >
          <span className="flex items-center whitespace-nowrap">
            <span className="mr-2">•</span>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(item.name + ' ' + item.searchSuffix)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="slide-underline"
            >
              {item.name}
            </a>
          </span>
          <div className="flex-1 border-b border-dashed" style={{ borderColor: 'var(--dotted-line)' }} />
          <button
            onClick={() => onPlay(item.audioFile, item.startTime)}
            className="text-text p-1"
            title={isPlaying(item.audioFile) ? 'Pause' : 'Play'}
          >
            {isPlaying(item.audioFile) ? <PauseIcon /> : <PlayIcon />}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function Music(): JSX.Element {
  const { handlePlay, isPlaying } = useAudio();
  const [hovered, setHovered] = useState<{ category: string; name: string } | null>(null);

  const createHoverHandler = useCallback((category: string) => 
    (name: string | null) => setHovered(name ? { category, name } : null)
  , []);

  const getHoveredForCategory = (category: string) =>
    hovered?.category === category ? hovered.name : null;

  return (
    <div className="flex-1 flex flex-col pt-[100px]">
      <h1 className="font-[580] text-text mb-6">Favorite media</h1>

      <div className="text-text">
        <h3 className="font-normal mb-3 opacity-50">Film</h3>
        <MediaList
          items={filmItems}
          hoveredItem={getHoveredForCategory('film')}
          onHover={createHoverHandler('film')}
          onPlay={handlePlay}
          isPlaying={isPlaying}
        />

        <h3 className="font-normal mb-3 opacity-50">Music</h3>
        <MediaList
          items={musicItems}
          hoveredItem={getHoveredForCategory('music')}
          onHover={createHoverHandler('music')}
          onPlay={handlePlay}
          isPlaying={isPlaying}
        />

        <h3 className="font-normal mb-3 opacity-50">Games</h3>
        <MediaList
          items={gameItems}
          hoveredItem={getHoveredForCategory('games')}
          onHover={createHoverHandler('games')}
          onPlay={handlePlay}
          isPlaying={isPlaying}
        />
      </div>
    </div>
  );
}
