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
import { OrderPage } from "./pages/Order";

// Componente para rotas protegidas
const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Componente para rotas onde usuários autenticados não devem acessar
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
    element: <MainLayout />, // MainLayout aparece apenas nas rotas de dentro
    children: [
      {
        path: "/",
        element: <Home />, // Home não exige autenticação
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoutes>
            <Cart /> {/* Cart só pode ser acessado se estiver logado */}
          </ProtectedRoutes>
        ),
      },
      {
        path: "/order-success",
        element: (
          <ProtectedRoutes>
            <OrderPage /> {/* Cart só pode ser acessado se estiver logado */}
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthenticatedUser>
        <LoginPage /> {/* LoginPage não usa o MainLayout */}
      </AuthenticatedUser>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthenticatedUser>
        <RegisterPage /> {/* RegisterPage também não usa o MainLayout */}
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
