import IntroSection from '../components/IntroSection';
import ExperienceSection from '../components/ExperienceSection';
import NowSection from '../components/NowSection';

export default function Home(): JSX.Element {
  return (
    <div className="flex-1 flex flex-col">
      <IntroSection />
      <ExperienceSection />
      <NowSection />
    </div>
  );
}

