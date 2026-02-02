import { LibraryBig } from "lucide-react";
export const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white mt-16">
      <div className="max-w-[75rem] mx-auto px-6 md:px-8 lg:px-10 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              <LibraryBig className="w-6 h-6 inline-block mr-2" style={{ color: 'rgb(79, 70, 229)' }}/>
              Library
            </h3>
            <p className="text-gray-400 dark:text-gray-500 text-sm leading-relaxed">
              Votre bibliothèque numérique pour rechercher des livres.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-colors text-sm">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/search" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-colors text-sm">
                  Recherche
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 dark:border-gray-900 pt-6 text-center">
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            © {new Date().getFullYear()} Supinfo - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
