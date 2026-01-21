import './Hero.css';

export interface HeroProps {
  title: string;
  subtitle: string;
}

export const Hero = ({ title, subtitle }: HeroProps) => {
  return (
    <section className="hero">
      <h1 className="hero__title">{title}</h1>
      <p className="hero__subtitle">{subtitle}</p>
    </section>
  );
};
