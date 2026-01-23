export const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white mt-16">
      <div className="max-w-[75rem] mx-auto px-6 md:px-8 lg:px-10 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              📚 Library
            </h3>
            <p className="text-gray-400 dark:text-gray-500 text-sm leading-relaxed">
              Votre bibliothèque numérique pour gérer et organiser votre collection de livres.
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
                <a href="/catalog" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-colors text-sm">
                  Catalogue
                </a>
              </li>
              <li>
                <a href="/favorites" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-colors text-sm">
                  Favoris
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-400 dark:text-gray-500 text-sm">Email: contact@library.com</li>
              <li className="text-gray-400 dark:text-gray-500 text-sm">Tél: +33 1 23 45 67 89</li>
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
