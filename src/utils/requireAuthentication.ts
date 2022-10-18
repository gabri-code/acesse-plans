import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

export const requireAuthentication = (
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

  return callback({ token });
};
