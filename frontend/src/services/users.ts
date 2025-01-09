import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const signup = async ({ name, email, password }: SignupData) => {
  try {
    const { data } = await api.post("users/register", {
      name,
      email,
      password,
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Ocorreu um erro ao se cadastrar");
  }
};

export const login = async ({ email, password }: LoginData) => {
  try {
    const { data } = await axios.post(
      "/users/login",
      {
        email,
        password,
      },
      {
        withCredentials: true, // Adicione isso aqui para enviar cookies
      }
    );
    console.log("Login data:", data);

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Ocorreu um erro ao se logar");
  }
};
