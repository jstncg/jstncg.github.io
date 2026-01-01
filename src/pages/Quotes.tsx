export default function Quotes(): JSX.Element {
  return (
    <div className="flex-1 pt-[100px]">
      <h1 className="font-bold text-text mb-10">Favorite Quotes</h1>
      <div className="text-text">
        <p className="text-[length:var(--font-size-h3)] opacity-80 leading-relaxed">
          Add your favorite quotes here.
        </p>
      </div>
    </div>
  );
}

