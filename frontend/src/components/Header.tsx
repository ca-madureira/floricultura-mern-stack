import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";

import { RootState } from "../store/types";

import logo from "../assets/logoipsum.svg";
import { setLogout } from "../store/auth-slice";
import { clearCart } from "../store/cart-slice";

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const cart = useSelector((state: RootState) => state.cart);
  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogout());
    dispatch(clearCart());
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <header className="bg-[#27984c] p-2 flex justify-between items-center">
      <div
        className="flex items-center text-white font-bold cursor-pointer"
        onClick={handleHome}
      >
        <img src={logo} className="w-10" alt="Logo Flores de Papel" />
        <span className="ml-2">Flores de Papel</span>
      </div>

      <nav className="flex gap-4 px-4">
        <Link to="/cart" className="relative">
          <FaCartShopping className="text-white w-6 h-6" />
          <div className="absolute top-0 right-0 bg-teal-400 text-white rounded-full text-xs font-bold w-4 h-4 flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
            {cart.items.length}
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
                {isAuth ? (
                  <li>
                    <button onClick={handleLogout}>Sair</button>
                  </li>
                ) : (
                  <Link to="/login">Login</Link>
                )}

                {isAuth && (
                  <li>
                    <Link to="/order-success">Pedidos</Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </nav>
    </header>
  );
};
