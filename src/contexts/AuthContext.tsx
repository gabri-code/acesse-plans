import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { setCookie, destroyCookie } from 'nookies';
import Router from 'next/router';
import { useMutation } from '@apollo/client';
import { UserLogin, UserResponse } from '../types';
import { SIGNIN_MUTATION } from '../graphql/mutations/user/signin';
import { SIGNOUT_MUTATION } from '../graphql/mutations/user/signout';

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (data: UserLogin) => Promise<void | { message: string }>;
  signOut: (id: string) => Promise<void | { message: string }>;
  user: UserResponse | null;
  setUser: Dispatch<SetStateAction<UserResponse | null>>;
  isLoading: boolean;
  setPageLoading: (value: boolean) => void;
};

type AuthProviderType = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: FC<AuthProviderType> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [signInRequest] = useMutation(SIGNIN_MUTATION);
  const [signOutRequest] = useMutation(SIGNOUT_MUTATION);

  const isAuthenticated = !!user;

  const setPageLoading = (value: boolean) => setIsLoading(value);

  const signIn = async ({ email, password }: UserLogin) => {
    try {
      const {
        data: {
          signIn: { token },
        },
      } = await signInRequest({ variables: { data: { email, password } } });

      setCookie(undefined, 'acesse-token', token, {
        maxAge: 60 * 60 * 8, // 8 horas
      });

      Router.push('/');
    } catch (error: any) {
      return {
        message: error.message,
      };
    }
  };

  const signOut = async (id: string) => {
    try {
      console.log(id);
      await signOutRequest({ variables: { id } });
      destroyCookie(undefined, 'acesse-token');
      Router.push('/signin');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        user,
        signOut,
        setUser,
        isLoading,
        setPageLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
