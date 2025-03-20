import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen m-2 md:m-0">
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
};

export default MainLayout;
