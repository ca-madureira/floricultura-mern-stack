import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./components/Sidebar";

import { Categories } from "./pages/Categories";
import { Products } from "./pages/Products";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Sidebar />,

      children: [
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "create-product",
          element: <Products />,
        },
      ],
    },
  ]);

  return (
    <main className="flex">
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  );
}

export default App;
