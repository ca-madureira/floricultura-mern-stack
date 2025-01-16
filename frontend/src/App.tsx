import { useSelector } from "react-redux";
import "./App.css";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/RegisterPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootState } from "./store/types";
import { Navigate } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthenticatedUser>
        <LoginPage />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthenticatedUser>
        <RegisterPage />
      </AuthenticatedUser>
    ),
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  );
}

export default App;
