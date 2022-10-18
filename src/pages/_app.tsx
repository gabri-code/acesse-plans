import type { AppProps } from 'next/app';

import '../styles/global.scss';

import 'antd/dist/antd.css';
import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
