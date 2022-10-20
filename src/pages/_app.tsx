import type { AppProps } from 'next/app';

import 'antd/dist/antd.css';

// import '../styles/global.scss';

import { AuthProvider } from '../contexts/AuthContext';
import { GlobalStyle } from '../styles/globalStyle';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
