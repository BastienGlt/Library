import { createBrowserRouter } from "react-router";
import { Layout } from "@/layout/Layout";
import { HomePage } from "@pages/Home";
import { NotFoundPage } from "@pages/NotFound";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);

export default routes;
