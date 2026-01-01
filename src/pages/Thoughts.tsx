export default function Thoughts(): JSX.Element {
  return (
    <div className="flex-1 pt-[100px]">
      <h1 className="font-bold text-text mb-10">Random Thoughts</h1>
      <div className="text-text">
        <p className="text-[length:var(--font-size-h3)] opacity-80 leading-relaxed">
          Add your random thoughts here.
        </p>
      </div>
    </div>
  );
}

