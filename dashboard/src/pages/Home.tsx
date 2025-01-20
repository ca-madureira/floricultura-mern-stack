import dashboard from "../assets/dashboard.svg";

export const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <img src={dashboard} className="w-[70%]" />
      <p className="text-xl text-center font-semibold text-[#27984c] ">
        Bem-vindo(a) ao Painel Administrativo de Flores de Papel
      </p>
    </main>
  );
};
