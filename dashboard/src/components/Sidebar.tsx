import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="flex w-full">
      {/* <div className="w-1/6"> */}
      <aside className="bg-zinc-100 w-[20%] h-screen fixed top-0 left-0">
        <div className="text-center p-4 text-lg text-slate-500 font-bold">
          Dashboard
        </div>
        <hr className="w-full border-b-1 border-green-200" />
        <nav className="text-center text-slate-500">
          <ul>
            <li className="m-2 p-2 hover:bg-green-300 hover:text-slate-800 font-medium hover:rounded-md cursor-pointer text-sm">
              <Link to="/categories">Categorias</Link>
            </li>

            <li className="m-2 p-2 hover:bg-green-300 hover:text-slate-800 font-medium hover:rounded-md cursor-pointer text-sm">
              <Link to="/products">Produtos</Link>
            </li>
          </ul>
        </nav>
      </aside>
      {/* </div> */}

      {/* Conteúdo principal ajustado para não ficar atrás da sidebar */}
      <div className="ml-[20%] w-[80%]">
        <Outlet />
      </div>
    </div>
  );
};
