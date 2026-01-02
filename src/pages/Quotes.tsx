export default function Quotes(): JSX.Element {
  const principles = [
    "How you do anything is how you do everything.",
    "You only lose when you die.",
    "Action is everything.",
    "If no one has done it, why can't I be the first?",
    "If few have done it, why can't I?",
  ];

  return (
    <div className="flex-1 flex flex-col pt-[100px]">
      <h1 className="font-[580] text-text mb-6">Principles</h1>
      <ul className="text-text space-y-2">
        {principles.map((principle, index) => (
          <li key={index} className="text-[length:var(--font-size-h3)] flex items-center">
            <span className="mr-2">•</span>
            <span>{principle}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
