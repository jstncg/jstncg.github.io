import { CSSProperties } from 'react';

interface Experience {
  company: string;
  role: string;
  image: string;
  url?: string;
  imageScale?: number;
  imageOffset?: string;
}

const experiences: Experience[] = [
  {
    company: 'Sentra',
    role: 'Head of Strategy & Operations',
    image: '/assets/sentra-logo.svg',
    url: 'https://www.sentra.app/',
  },
  {
    company: 'Clarq',
    role: 'Co-founder',
    image: '/assets/clarq.svg',
    url: 'https://www.clarq.ca/',
  },
  {
    company: 'Gleam',
    role: 'Software Engineer',
    image: '/assets/gleam.svg',
    url: 'https://trygleam.app/',
    imageScale: 0.78,
  },
  {
    company: 'IBM',
    role: 'Strategy Consultant',
    image: '/assets/ibm.svg',
    url: 'https://www.ibm.com/ca-en',
  },
  {
    company: 'Manulife',
    role: 'Accounting & Finance Analyst',
    image: '/assets/manulife.svg',
    url: 'https://www.manulifeim.com/en',
    imageScale: 0.7,
    imageOffset: '3px',
  },
];

function ExperienceLogo({ exp }: { exp: Experience }): JSX.Element {
  const scale = exp.imageScale || 1;
  const imageStyle: CSSProperties = {
    maxWidth: `${scale * 100}%`,
    maxHeight: `${scale * 100}%`,
    ...(exp.imageOffset && { marginLeft: exp.imageOffset }),
  };

  return (
    <div className="w-12 h-12 md:w-10 md:h-10 rounded-lg flex items-center justify-center p-2 flex-shrink-0 bg-white/[0.06]">
      <img
        src={exp.image}
        alt={exp.company}
        className="w-full h-full object-contain experience-logo"
        style={imageStyle}
      />
    </div>
  );
}

function ExperienceItem({ exp }: { exp: Experience }): JSX.Element {
  const content = (
    <>
      <ExperienceLogo exp={exp} />
      <div className="flex-1">
        <h3 className="font-normal text-text">{exp.company}</h3>
        <h3 className="font-normal text-text opacity-50 group-hover:opacity-100 transition-opacity duration-200 ease-out">
          {exp.role}
        </h3>
      </div>
    </>
  );

  const className = "flex items-start gap-4 py-2.5 md:gap-3.5 -mx-3 px-3 rounded hover:bg-[#222327] group transition-colors duration-200 ease-out";

  if (exp.url) {
    return (
      <a href={exp.url} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}

export default function ExperienceSection(): JSX.Element {
  return (
    <section className="mb-[60px]">
      <h2 className="font-[580] text-text mb-3 opacity-50">Experience</h2>
      <div className="flex flex-col mt-3">
        {experiences.map((exp) => (
          <ExperienceItem key={exp.company} exp={exp} />
        ))}
      </div>
    </section>
  );
}
