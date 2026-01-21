export interface HeroProps {
  title: string;
  subtitle: string;
}

export const Hero = ({ title, subtitle }: HeroProps) => {
  return (
    <section className="px-6 py-12 md:px-8 md:py-16 lg:px-12 lg:py-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-2xl mb-12 shadow-[0_10px_40px_rgba(102,126,234,0.25)] text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
        {title}
      </h1>
      <p className="text-base md:text-lg lg:text-xl opacity-95 max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    </section>
  );
};
