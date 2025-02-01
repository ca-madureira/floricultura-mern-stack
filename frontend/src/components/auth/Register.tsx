import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";

import { signup } from "../../services/users";
import { registerSchema } from "../../schemas/userSchema";

import signupImage from "../../assets/signup_login.svg";

export const Register = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      return signup({ name, email, password });
    },
    onSuccess: () => {
      navigate("/login");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const password = watch("password");

  const onSubmit = (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    mutate(data);
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <section className="flex justify-center h-screen md:items-start ">
      <section className="relative w-1/2 flex flex-col hidden md:block ">
        <section className="">
          <h1 className="text-2xl text-center text-[#27984c] font-bold my-4">
            Faça seu cadastro e conheça nossa papelaria
          </h1>
          <p className="text-lg text-center text-gray-400 font-light  my-4">
            Os melhores preços estão aqui!
          </p>
        </section>
        <img src={signupImage} className="w-full h-full object-cover" />
      </section>

      <section className="md:w-1/2 bg-[#f5f5f5] flex flex-col md:p-20">
        <h1 className="text-lg text-[#060606] font-semibold"></h1>
        <section className="">
          <h3 className="text-2xl font-semibold mb-4 text-slate-600">
            Cadastro
          </h3>
          <p className="text-sm mb-2 text-slate-600">
            Bem-vindo(a)! Por favor insira seus dados
          </p>
          <section className="flex flex-col">
            <div className="relative">
              <input
                type="text"
                {...register("name", {
                  minLength: {
                    value: 1,
                    message: "Nome deve conter ao menos 3 caracteres",
                  },
                  required: { value: true, message: "Nome é obrigatorio" },
                })}
                placeholder="Insira seu nome"
                className="w-full text-black py-2 my-2 pl-10 bg-transparent border-b border-black outline-none focus:outline-none"
              />
              {errors.name?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name?.message}
                </p>
              )}
              <FaRegUser className="absolute left-2 top-4 w-5 h-5 text-gray-400" />
            </div>

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
                  required: { value: true, message: "Email é obrigatorio" },
                })}
                className="w-full text-black py-2 my-2 pl-10 bg-transparent border-b border-black outline-none focus:outline-none"
              />
              {errors.email?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email?.message}
                </p>
              )}
              <MdOutlineAlternateEmail className="absolute left-2 top-4 w-5 h-5 text-gray-400" />
            </div>

            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"} // Tipo dinâmico para visibilidade da senha
                placeholder="Senha"
                {...register("password", {
                  required: { value: true, message: "Senha é obrigatoria" },
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
              <RiLockPasswordLine className="absolute left-2 top-4 w-5 h-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)} // Alterna o estado da visibilidade
                className="absolute right-2 top-4"
              >
                {passwordVisible ? (
                  <RiEyeOffLine className="w-5 h-5 text-gray-400" />
                ) : (
                  <RiEyeLine className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>

            <div className="relative">
              <input
                type={confirmPasswordVisible ? "text" : "password"} // Tipo dinâmico para visibilidade da confirmação de senha
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirmar a senha é obrigatorio",
                  },
                  validate: (value) => {
                    if (value !== password) {
                      return "Senhas não se coincidem";
                    }
                  },
                })}
                placeholder="Confirmar senha"
                className="w-full text-black py-2 my-2 pl-10 bg-transparent border-b border-black outline-none focus:outline-none"
              />
              {errors.confirmPassword?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword?.message}
                </p>
              )}
              <RiLockPasswordLine className="absolute left-2 top-4 w-5 h-5 text-gray-400" />
              <button
                type="button"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                } // Alterna o estado da visibilidade
                className="absolute right-2 top-4"
              >
                {confirmPasswordVisible ? (
                  <RiEyeOffLine className="w-5 h-5 text-gray-400" />
                ) : (
                  <RiEyeLine className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>

            <p className="mt-2 text-sm text-slate-600">
              Já possui conta?{" "}
              <a
                href="/login"
                className="text-[#27984c] font-semibold hover:underline"
              >
                Login
              </a>
            </p>
          </section>

          <section className="w-full flex flex-col my-4">
            <button
              type="submit"
              disabled={!isValid}
              onClick={handleSubmit(onSubmit)}
              className="w-full text-white font-bold rounded-md p-4 text-center flex items-center justify-center bg-[#27984c]"
            >
              Cadastrar
            </button>
          </section>
        </section>
      </section>
    </section>
  );
};
