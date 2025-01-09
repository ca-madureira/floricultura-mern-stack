import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

import signupImage from "../../assets/notebook.svg";
import { login } from "../../services/users";
import { registerSchema } from "../../schemas/userSchema";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/auth-slice";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
//import { RootState } from "../../store/types";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const userState = useSelector((state: RootState) => state.user);

  const { mutate } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return login({ email, password });
    },
    onSuccess: (data) => {
      // localStorage.setItem("account", JSON.stringify(data)); // Verifique se isso é necessário
      dispatch(setLogin({ user: data.user, token: data.token }));
      navigate("/");
    },
  });

  // useEffect(() => {
  //   if (userState.isAuthenticated) {
  //     navigate("/"); // Se o usuário já estiver autenticado, redireciona para a home
  //   }
  // }, [navigate, userState.isAuthenticated]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: { email: string; password: string }) => {
    mutate(data);
  };

  return (
    <section className="w-full min-h-screen flex items-start border-4 border-purple-900">
      <section className="relative w-1/2 min-h-screen flex flex-col border-2 border-red-200">
        <section>
          <h1 className="text-2xl text-sky-500 font-bold my-4">
            Cadastre-se e comece a fazer suas compras
          </h1>
          <p className="text-lg text-sky-400 font-bold my-4">
            Os melhores preços estão na Lojinha de Flores de Papel
          </p>
        </section>
        <img src={signupImage} className="w-full h-full object-cover" />
      </section>

      <section className="w-1/2 min-h-screen bg-[#f5f5f5] flex flex-col p-20 border-2 border-red-200">
        <h1 className="text-lg text-[#060606] font-semibold"></h1>
        <section>
          <h3 className="text-2xl font-semibold mb-4">Cadastro</h3>
          <p className="text-sm mb-2">
            Bem-vindo(a)! Por favor insira seus dados
          </p>
          <section className="flex flex-col">
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Insira um email valido",
                  },
                  required: {
                    value: true,
                    message: "Email é obrigatorio",
                  },
                })}
                className="w-full text-black py-2 my-2 pl-10 bg-transparent border-b border-black outline-none focus:outline-none"
              />
              {errors.email?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email?.message}
                </p>
              )}
              <MdOutlineAlternateEmail className="absolute left-2 top-2.5 w-5 h-5 text-gray-400" />
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Senha"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Senha é obrigatoria",
                  },
                  minLength: {
                    value: 6,
                    message: "Senha deve contar ao menos 6 caracteres",
                  },
                })}
                className="w-full text-black py-2 my-2 pl-10 bg-transparent border-b border-black outline-none focus:outline-none"
              />
              {errors.password?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password?.message}
                </p>
              )}
              <RiLockPasswordLine className="absolute left-2 top-2.5 w-5 h-5 text-gray-400" />
            </div>

            <p className="mt-2">
              Já possui conta?{" "}
              <a href="/signup" className="text-blue-500">
                cadastrar
              </a>
            </p>
          </section>

          <section className="w-full flex flex-col my-4 ">
            <button
              type="submit"
              disabled={!isValid}
              onClick={handleSubmit(onSubmit)} // Aqui você já está usando o handleSubmit
              className="w-full text-white bg-sky-500 rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
            >
              Logar
            </button>
          </section>
        </section>
      </section>
    </section>
  );
};
