import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next';
import Head from 'next/head';
import DefaultLayoult from '../layoults/Default';
import { client, getMe } from '../services/api';
import { getApiClient } from '../services/api/axios';
import { UserResponse } from '../types';
import { requireAuthentication } from '../utils/requireAuthentication';

export interface IPageProps {
  title: string;
  user: UserResponse;
}

const Home: NextPage<IPageProps> = ({ title, user }) => {
  return (
    <>
      <Head>
        <title>Painel de Controle</title>
        <meta name="description" content="Painel de controle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultLayoult title={title} user={user}>
        <h1></h1>
      </DefaultLayoult>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return requireAuthentication(context, async () => {
    const api = getApiClient(context);

    const response = await api.get('/user/me');

    return {
      props: {
        user: response.data,
        title: 'Painel de Controle',
      },
    };
  });
};

export default Home;
