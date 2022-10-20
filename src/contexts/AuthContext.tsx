import { createContext, FC, ReactNode, useState } from 'react';
import { setCookie, destroyCookie } from 'nookies';
import { signInRequest, signOutRequest } from '../services/api/User';
import { IError, UserLogin, UserResponse } from '../types';
import Router from 'next/router';

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (data: UserLogin) => Promise<void | IError>;
  signOut: (id: string) => Promise<void | IError>;
  user: UserResponse | null;
};

type AuthProviderType = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: FC<AuthProviderType> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(null);

  const isAuthenticated = !!user;

  // useEffect(() => {
  //   const { 'acesse-token': token } = parseCookies();

  //   if (token) {
  //     getMe(token).then((user) => setUser(user));
  //   }
  // }, []);

  const signIn = async ({ email, password }: UserLogin) => {
    try {
      const { token, user } = await signInRequest({ email, password });

      setCookie(undefined, 'acesse-token', token, {
        maxAge: 60 * 60 * 8, // 8 horas
      });

      setUser(user);

      Router.push('/');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  };

  const signOut = async (id: string) => {
    try {
      await signOutRequest(id);
      destroyCookie(undefined, 'acesse-token');
      Router.push('/signin');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
