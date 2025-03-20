import hero from "../assets/hero.png";

export const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-purple-400 to-rose-300 w-full md:flex md:items-center md:justify-center p-2">
      <img src={hero} alt="imagem de flores" className="imagem de flores" />
      <section className="md:flex items-center md:w-[45%]">
        <p className="border-l-4 border-purple-200 pl-2 md:text-xl text-white text-sm">
          Seja para um presente especial ou para decorar o seu lar, temos flores
          e arranjos feitos com carinho para você. Navegue por nossa coleção e
          descubra a beleza de cada pétala, com entrega rápida e segura.
        </p>
      </section>
    </section>
  );
};
