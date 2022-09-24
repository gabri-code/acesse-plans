import type { NextPage } from 'next';
import Head from 'next/head';
import DefaultLayoult from '../layoults/Default';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Painel de controle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultLayoult />
    </>
  );
};

export default Home;
