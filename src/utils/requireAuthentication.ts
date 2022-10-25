import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';
import createApolloClient from '../graphql/client';
import { GET_ME_QUERY } from '../graphql/queries/user/getMe';

export const requireAuthentication = async (
  ctx: GetServerSidePropsContext,
  callback: any
) => {
  const { 'acesse-token': token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  const client = createApolloClient({}, ctx);

  const { data } = await client.query({
    query: GET_ME_QUERY,
  });

  return callback(client, data.getMe);
};
