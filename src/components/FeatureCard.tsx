export interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <article className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center h-full focus-within:outline focus-within:outline-2 focus-within:outline-indigo-600 dark:focus-within:outline-indigo-500 focus-within:outline-offset-2">
      <div className="text-6xl mb-6 leading-none" aria-hidden="true">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed m-0">
        {description}
      </p>
    </article>
  );
};
