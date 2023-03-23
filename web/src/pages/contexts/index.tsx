import { createContext, ReactNode, useEffect, useState } from "react";
// Cookies
import { parseCookies, setCookie } from "nookies";
// Rotas
import Router from "next/router";
// Manipulação do usuário
import { recoverUserInformation, signInRequest } from "../../services/auth";
// AXIOS
import api from "../../services/api";

// Interfaces
export interface TUser {
  id: number;
  name: string;
  email: string;
  registration: string;
  createdAt: string;
  updatedAt: string;
  organizations: {
    id: number;
    name: string;
  };
  groups: [
    {
      group: {
        id: number;
        name: string;
      };
    }
  ];
}

export interface TSignInData {
  email: string;
  password: string;
}

interface TAuthContext {
  isAuthenticated: boolean;
  user: TUser;
  signIn: (data: TSignInData) => Promise<boolean>;
}

// Função de contexto da autenticação
export const AuthContext = createContext({} as TAuthContext);

interface TAuthProvider {
  children: ReactNode;
}

const AuthProvider = ({ children }: TAuthProvider) => {
  const [user, setUser] = useState<TUser>({} as TUser);

  const isAuthenticated = !!user;

  // Obtem o usuário logado
  const getUserLogged = async () => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      const user = await recoverUserInformation();
      setUser(user);
    }
  };

  // Adiciona no estado o usuário que possui cookie
  useEffect(() => {
    getUserLogged();
  }, []);

  // Função para realizar o login, cadastrar o token no cookies e adicionar aos headers da requisição
  async function signIn({ email, password }: TSignInData) {
    try {
      const response = await signInRequest({
        email,
        password,
      });
      const { data } = response;
      // Verifica se o login foi bem sucedido
      if (response.status === 201) {
        // Obtem o token
        const { token } = data;
        // Obtem o usuário
        const { user } = data;

        // Salva o token
        setCookie(undefined, "nextauth.token", token, {
          maxAge: 60 * 60 * 24, // 24 horas
        });

        // Salva as informações do usuário no Cookies
        const userCookies = JSON.stringify(user);
        setCookie(undefined, "user", userCookies, {
          maxAge: 60 * 60 * 24, // 24 horas
        });

        // Adiciona o token ao headers
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Seta a sessão do usuário
        setUser(user);

        Router.push("/inicio");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("======Erro ao realizar o login======");
      console.log(error);
      console.log("======end======");
      return false;
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
