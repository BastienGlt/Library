import { Link } from "react-router";
import { Button } from "@/components/Button";

export const NotFoundPage = () => {
  return (
    <div className="w-full max-w-[75rem] mx-auto px-6 md:px-8 lg:px-10 py-12 md:py-16">
      <div className="flex flex-col items-center justify-center text-center min-h-[60vh]">
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-indigo-600 to-purple-700 dark:from-indigo-400 dark:to-purple-500 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Page introuvable
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link to="/">
            <Button size="large">
              Retour à l'accueil
            </Button>
          </Link>
          <Link to="/catalog">
            <Button size="large" variant="secondary">
              Voir le catalogue
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
