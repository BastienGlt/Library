import { createBrowserRouter } from "react-router";
import { Layout } from "@/layout/Layout";
import { HomePage } from "@pages/Home";
import { SearchPage } from "@pages/Search";
import { BookDetailPage } from "@pages/BookDetail";
import { NotFoundPage } from "@pages/NotFound";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "search", Component: SearchPage },
      { path: "book/works/:workId", Component: BookDetailPage },
      { path: "book/books/:editionId", Component: BookDetailPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);

export default routes;
