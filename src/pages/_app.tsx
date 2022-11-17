import type { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';

import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from '../contexts/AuthContext';
import { useApollo } from '../graphql/client';
import GlobalStyle from '../styles/GlobalStyle';

function MyApp({ Component, pageProps }: AppProps) {
  // const protectedRoutes = [
  //   '/',
  //   '/gerenciamento-usuarios',
  //   '/gerenciamento-clientes',
  // ];

  const client = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ChakraProvider>
          <GlobalStyle />
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
