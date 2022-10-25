import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/link-context';
import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';
import { cache } from './cache';

export default function createApolloClient(
  initialState = {},
  ctx?: GetServerSidePropsContext
) {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/',
  });

  const authLink = setContext((_, { headers }) => {
    const { 'acesse-token': token } = parseCookies(ctx);

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined' || Boolean(ctx),
    link: authLink.concat(httpLink),
    cache,
  });
}
