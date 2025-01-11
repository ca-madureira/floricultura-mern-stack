import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="flex w-full">
      <div className="w-1/5">
        <aside className="bg-gray-800 w-1/5 h-screen fixed top-0 left-0">
          <div className="text-center p-4 text-lg text-slate-200 font-bold">
            Dashboard
          </div>
          <hr className="w-full border-b-1 border-green-200" />
          <nav className="text-center text-slate-200">
            <ul>
              <li className="m-2 p-2 hover:bg-green-200 hover:text-slate-700 hover:rounded-md cursor-pointer text-sm">
                <Link to="/categories">Categorias</Link>
              </li>

              <li className="m-2 p-2 hover:bg-green-200 hover:text-slate-700 hover:rounded-md cursor-pointer text-sm">
                <Link to="/create-product">Produtos</Link>
              </li>
            </ul>
          </nav>
        </aside>
      </div>

      {/* Conteúdo principal ajustado para não ficar atrás da sidebar */}
      <div className="ml-1/5 w-4/5 h-screen">
        <Outlet />
      </div>
    </div>
  );
};
