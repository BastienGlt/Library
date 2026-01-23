import { Outlet } from "react-router";
import { useTheme } from "@/hooks/useTheme";
// import { MSWControl } from "@/components/MSWControl";

import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

export const Layout = () => {
  useTheme(); // Initialise et synchronise le thème
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <Outlet />
      </main>
      <Footer />
      {/* <MSWControl /> */}
    </div>
  );
};
