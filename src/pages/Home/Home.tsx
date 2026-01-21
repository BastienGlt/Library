import { Hero } from '@/components/Hero';
import { FeatureCard } from '@/components/FeatureCard';
import type { FeatureCardProps } from '@/components/FeatureCard';
import { Button } from '@/components/Button';
import './Home.css';

const Home = () => {
  const features: FeatureCardProps[] = [
    {
      icon: '📚',
      title: 'Catalogue complet',
      description: 'Parcourez et organisez votre collection de livres',
    },
    {
      icon: '🔍',
      title: 'Recherche avancée',
      description: 'Trouvez rapidement n\'importe quel livre de votre bibliothèque',
    },
    {
      icon: '⭐',
      title: 'Favoris',
      description: 'Marquez vos livres préférés pour un accès rapide',
    },
  ];

  const handleExplore = (): void => {
    // TODO: Implémenter la navigation vers le catalogue
    console.log('Navigation vers le catalogue');
  };

  return (
    <div className="home">
      <Hero
        title="Bienvenue dans votre Bibliothèque"
        subtitle="Gérez votre collection de livres facilement et efficacement"
      />

      <section className="home__features">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </section>

      <section className="home__cta">
        <h2 className="home__cta-title">Commencez dès maintenant</h2>
        <p className="home__cta-text">
          Explorez votre bibliothèque et découvrez de nouveaux livres
        </p>
        <Button size="large" onClick={handleExplore}>
          Explorer la bibliothèque
        </Button>
      </section>
    </div>
  );
};

export default Home;
