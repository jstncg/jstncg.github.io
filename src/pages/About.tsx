export default function About(): JSX.Element {
  return (
    <div className="flex-1">
      <section className="pt-16 md:pt-20">
        <h1 className="font-semibold text-text mb-6">Hi,</h1>
        <div className="space-y-4">
          <p className="text-text opacity-80 leading-relaxed text-[length:var(--font-size-h3)]">
            My name is Justin. Born in Vancouver, moved to Hong Kong and Shanghai before I could speak, and finally to Toronto right as I learned how to write, I have always been chasing greatness.
          </p>

          <p className="text-text opacity-80 leading-relaxed text-[length:var(--font-size-h3)]">
            Yet my early years of adolescence were spent consumed by mental masturbation. I would frequently tell my family and friends how hard I was studying, only to secretly play video games behind their backs. I would flaunt my efforts in the gym, posting them on instagram, only to work out and exercise inconsisntently. I would explain how difficult my work was to my partner, and express how much learning I need to do, only to finish my menial tasks in just under an hour. Hence why I was always faced with mediocrity.
          </p>

          <p className="text-text opacity-80 leading-relaxed text-[length:var(--font-size-h3)]">
            I went to a tier 2 highschool. I never placed in sports competitions. and ended up at a bad non-target university in toronto.
          </p>
        </div>
      </section>
    </div>
  );
}

