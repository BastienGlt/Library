import { Outlet } from "react-router";

import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

export const Layout = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1 py-8 md:py-12">
      <Outlet />
    </main>
    <Footer />
  </div>
);
