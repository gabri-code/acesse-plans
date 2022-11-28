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
import { SIGNIN_MUTATION } from '../graphql/mutations/user/signin';
import { SIGNOUT_MUTATION } from '../graphql/mutations/user/signout';
import { SignInUserInput } from '../types/inputs/SignIn';
import { ErrorResponse, User } from '../types';
import {
  AdminSignInData,
  CustomerSignInData,
  IndicatorSignInData,
} from '../types/mutations/User';
import { PreIndicator } from '../types/PreIndicator';

type AuthContextType = {
  customerSignIn: (
    data: SignInUserInput
  ) => Promise<void | { error: ErrorResponse } | undefined>;
  adminSignIn: (
    data: SignInUserInput
  ) => Promise<void | { error: ErrorResponse } | undefined>;
  indicatorSignIn: (
    data: SignInUserInput
  ) => Promise<
    void | { preIndicator?: PreIndicator; error?: ErrorResponse } | undefined
  >;
  signOut: (id: string) => Promise<void | { message: string }>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isLoading: boolean;
  setPageLoading: (value: boolean) => void;
};

type AuthProviderType = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: FC<AuthProviderType> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [customerSignInRequest] =
    useMutation<CustomerSignInData>(SIGNIN_MUTATION);
  const [indicatorSignInRequest] =
    useMutation<IndicatorSignInData>(SIGNIN_MUTATION);
  const [adminSignInRequest] = useMutation<AdminSignInData>(SIGNIN_MUTATION);
  const [signOutRequest] = useMutation(SIGNOUT_MUTATION);

  const setPageLoading = (value: boolean) => setIsLoading(value);

  const customerSignIn = async ({ email, password }: SignInUserInput) => {
    const { data } = await customerSignInRequest({
      variables: { role: 'customer', data: { email, password } },
    });

    if (data?.signIn.error) {
      return {
        error: data?.signIn.error,
      };
    }

    if (data?.signIn) {
      setCookie(undefined, 'auth.token', data?.signIn?.token, {
        maxAge: 60 * 60 * 8, // 8 horas
      });

      // setCookie(undefined, 'user', { id: data.signIn.user.id, role: })

      setUser(user);

      Router.push('/');
    }
  };

  const indicatorSignIn = async ({ email, password }: SignInUserInput) => {
    const { data } = await indicatorSignInRequest({
      variables: { role: 'indicator', data: { email, password } },
    });

    if (data?.signIn.error && data.signIn.user) {
      return {
        preIndicator: data.signIn.user as PreIndicator,
      };
    }

    if (data?.signIn.error) {
      return {
        error: data?.signIn.error,
      };
    }

    if (data?.signIn) {
      setCookie(undefined, 'auth.token', data?.signIn?.token, {
        maxAge: 60 * 60 * 8, // 8 horas
      });

      // setCookie(undefined, 'user', { id: data.signIn.user.id, role: })

      setUser(user);

      Router.push('/');
    }
  };

  const adminSignIn = async ({ email, password }: SignInUserInput) => {
    const { data } = await adminSignInRequest({
      variables: { role: 'admin', data: { email, password } },
    });

    console.log(data);

    if (data?.signIn.error) {
      return {
        error: data.signIn.error,
      };
    }

    if (data?.signIn) {
      setCookie(undefined, 'auth.token', data?.signIn?.token, {
        maxAge: 60 * 60 * 8, // 8 horas
      });

      // setCookie(undefined, 'user', { id: data.signIn.user.id, role: })

      setUser(user);

      Router.push('/');
    }
  };

  const signOut = async (id: string) => {
    try {
      console.log(id);
      await signOutRequest({ variables: { id } });
      destroyCookie(undefined, 'auth.token');
      Router.push('/signin');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        customerSignIn,
        user,
        signOut,
        setUser,
        isLoading,
        setPageLoading,
        indicatorSignIn,
        adminSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
