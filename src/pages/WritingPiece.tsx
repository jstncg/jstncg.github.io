import { useParams, Link } from 'react-router-dom';

const writingContent: Record<string, { title: string; date: string; content: string }> = {
  'piece-1': {
    title: 'Piece 1',
    date: '2025-08-12',
    content: 'Content for piece 1 goes here...',
  },
  'piece-2': {
    title: 'Piece 2',
    date: '2025-06-23',
    content: 'Content for piece 2 goes here...',
  },
  'piece-3': {
    title: 'Piece 3',
    date: '2025-04-05',
    content: 'Content for piece 3 goes here...',
  },
  'piece-4': {
    title: 'Piece 4',
    date: '2025-02-19',
    content: 'Content for piece 4 goes here...',
  },
  'piece-5': {
    title: 'Piece 5',
    date: '2025-01-08',
    content: 'Content for piece 5 goes here...',
  },
};

export default function WritingPiece(): JSX.Element {
  const { pieceId } = useParams<{ pieceId: string }>();
  const piece = pieceId ? writingContent[pieceId] : null;

  if (!piece) {
    return (
      <div className="flex-1 flex flex-col pt-[100px]">
        <h1 className="font-[580] text-text mb-6">Not Found</h1>
        <Link to="/writing" className="text-text opacity-50 hover:opacity-100 transition-opacity">
          ← Back to Writing
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col pt-[100px]">
      <Link to="/writing" className="text-text opacity-50 hover:opacity-100 transition-opacity mb-8 text-[length:var(--font-size-body)]">
        ← Back to Writing
      </Link>
      <h1 className="font-[580] text-text mb-2">{piece.title}</h1>
      <p className="text-text opacity-50 mb-10 text-[length:var(--font-size-body)]">{piece.date}</p>
      <div className="text-text text-[length:var(--font-size-body)] leading-relaxed">
        {piece.content}
      </div>
    </div>
  );
}

