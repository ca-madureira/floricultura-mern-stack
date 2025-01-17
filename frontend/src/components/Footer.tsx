import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="flex bg-[#27984c] gap-4 md:gap-0 text-white justify-evenly p-4">
      <section className="mb-4 md:mb-0">
        <h3 className="font-bold text-teal-100 mb-2">Dúvidas</h3>
        <ul>
          <li>
            <a href="#" className="hover:underline">
              Como funciona a nossa loja
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Política de Privacidade
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Fale conosco
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Trabalhe conosco
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-4 md:mb-0">
        <h3 className="font-bold text-teal-100 mb-2">Redes Sociais</h3>
        <ul>
          <li className="flex items-center gap-2">
            <FaInstagram />
            <a href="#" className="hover:underline" aria-label="Instagram">
              Instagram
            </a>
          </li>
          <li className="flex items-center gap-2">
            <FaFacebook />
            <a href="#" className="hover:underline" aria-label="Facebook">
              Facebook
            </a>
          </li>
          <li className="flex items-center gap-2">
            <FaYoutube />
            <a href="#" className="hover:underline" aria-label="Youtube">
              Youtube
            </a>
          </li>
          <li className="flex items-center gap-2">
            <FaLinkedin />
            <a href="#" className="hover:underline" aria-label="Youtube">
              Linkedin
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h3 className="font-bold text-teal-100 mb-2">Formas de Pagamento</h3>
        <ul>
          <li>
            <a href="#" className="hover:underline">
              Cartões de crédito
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Boleto Bancário
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              PIX
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Débito Online
            </a>
          </li>
        </ul>
      </section>
    </footer>
  );
};
