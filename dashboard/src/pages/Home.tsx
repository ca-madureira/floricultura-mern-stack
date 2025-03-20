import dashboard from "../assets/admin.svg";

export const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <img src={dashboard} className="w-[50%]" />
      <p className="text-xl text-center font-semibold text-pink-500 ">
        Bem-vindo(a) ao Painel Administrativo de Flores de Papel
      </p>
    </main>
  );
};
