import type { AppProps } from 'next/app';

import 'antd/dist/antd.css';

// import '../styles/global.scss';

import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from '../contexts/AuthContext';
import { GlobalStyle } from '../styles/globalStyle';
import PageLoader from '../components/PageLoader';
import { useApollo } from '../graphql/client';

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
        <GlobalStyle />
        {/* <PageLoader> */}
        <Component {...pageProps} />
        {/* </PageLoader> */}
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
