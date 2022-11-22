import type { AppProps } from 'next/app';

import { ChakraProvider, CSSReset } from '@chakra-ui/react';

import { ApolloProvider } from '@apollo/client';
import { CacheProvider } from '@emotion/react';
import { AuthProvider } from '../contexts/AuthContext';
import { useApollo } from '../graphql/client';
import GlobalStyle from '../styles/GlobalStyle';
import emotionCache from '../lib/emotion-cache';

function MyApp({ Component, pageProps }: AppProps) {
  // const protectedRoutes = [
  //   '/',
  //   '/gerenciamento-usuarios',
  //   '/gerenciamento-clientes',
  // ];

  const client = useApollo(pageProps);

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ChakraProvider>
          {/* <CacheProvider value={emotionCache}> */}
          <CSSReset />
          <GlobalStyle />
          <Component {...pageProps} />
          {/* </CacheProvider> */}
        </ChakraProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
