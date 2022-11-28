import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';
import { initializeApollo } from '../graphql/client';
import { GET_ME_QUERY } from '../graphql/queries/user/getMe';

export const requireAuthentication = async (
  ctx: GetServerSidePropsContext,
  callback: any
) => {
  const { 'auth.token': token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/admin-signin',
        permanent: false,
      },
    };
  }

  try {
    const apolloClient = initializeApollo({}, ctx);

    const { data } = await apolloClient.query({
      query: GET_ME_QUERY,
    });

    return callback(apolloClient, data.getMe);
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }
};
