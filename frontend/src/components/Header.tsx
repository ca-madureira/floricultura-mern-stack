import { FaCartShopping } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import logo from "../assets/logoipsum.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-[#27984c] p-2 flex justify-between items-center">
      <div className="flex items-center text-white font-bold">
        <img src={logo} className="w-10" alt="Logo Flores de Papel" />
        <span className="ml-2">Flores de Papel</span>
      </div>

      <nav className="flex gap-4 px-4">
        <Link to="/cart" className="relative">
          <FaCartShopping className="text-white w-6 h-6" />
          <div className="absolute top-0 right-0 bg-teal-400 text-white rounded-full text-xs font-bold w-4 h-4 flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
            1
          </div>
        </Link>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Abrir menu do usuário"
            aria-expanded={showMenu ? "true" : "false"}
            className="focus:outline-none"
          >
            <FaUserAlt className="text-white w-6 h-6" />
          </button>

          {showMenu && (
            <nav
              aria-hidden={!showMenu}
              className="absolute top-8 right-0 bg-white text-black p-4 rounded-md shadow-lg"
            >
              <ul>
                <li>
                  <Link
                    to="/login"
                    className="block py-1 px-2 hover:bg-teal-200 rounded"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="block py-1 px-2 hover:bg-teal-200 rounded"
                  >
                    Cadastro
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </nav>
    </header>
  );
};
