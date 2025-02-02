import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FaRegNewspaper, FaRegListAlt } from "react-icons/fa";

export const Sidebar = () => {
  return (
    <div className="flex justify-between w-full">
      <aside className="bg-[#27984c] w-[12%] md:w-[20%] h-screen sticky top-0 left-0">
        <div className="flex items-center gap-2 text-center p-4 text-lg text-white font-bold">
          <img src={logo} alt="Logo" className="w-12" />

          <span className="text-sm md:text-lg hidden md:block hover:block">
            Flores de Papel
          </span>
        </div>
        <hr className="w-full border-b-1 border-green-200" />
        <nav className="text-center text-white">
          <ul>
            <li className="flex items-center gap-2 m-2 p-2 hover:bg-green-300 hover:text-slate-800 font-medium hover:rounded-md cursor-pointer">
              <Link to="/categories" className="flex items-center gap-2">
                <FaRegListAlt />
                <span className="hidden md:block">Categorias</span>
              </Link>
            </li>

            <li className="flex items-center gap-2 m-2 p-2 hover:bg-green-300 hover:text-slate-800 font-medium hover:rounded-md cursor-pointer">
              <Link to="/products" className="flex items-center gap-2">
                <FaRegNewspaper />
                <span className="hidden md:block ">Produtos</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};
