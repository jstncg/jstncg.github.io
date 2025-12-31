export default function IntroSection(): JSX.Element {
  return (
    <section className="flex items-start justify-center bg-bg pt-[100px] pb-4 mb-[30px]">
      <div className="text-left w-full">
        <h1 className="font-bold text-text mb-10 md:mb-6">Justin Cheng</h1>
        <h3 className="font-normal text-text mb-6">
          I build products at the intersection of design, technology, and storytelling.
          Currently, I lead strategy and operations at <a href="https://www.sentra.app/" target="_blank" rel="noopener noreferrer" className="slide-underline">Sentra</a>, the organizational
          memory system for your company.
        </h3>
        <h3 className="font-normal text-text mb-6">
          Previously, I've had stints as an accountant, consultant, and software engineer. I'm interested in all things film and finance, and am currently picking up
          writing. 
        </h3>
        <h3 className="font-normal text-text mb-6">
          I believe how you do anything is how you do everything - your character shows up in the details.
        </h3>
      </div>
    </section>
  );
}

