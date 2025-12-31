import IntroSection from '../components/IntroSection';
import ExperienceSection from '../components/ExperienceSection';
import TypingTest from '../components/TypingTest';

export default function Home(): JSX.Element {
  return (
    <div className="flex-1">
      <IntroSection />
      <ExperienceSection />
      <TypingTest />
    </div>
  );
}

