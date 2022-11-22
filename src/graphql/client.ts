import { useMemo } from 'react';
import type { GetServerSidePropsContext } from 'next';
import { NormalizedCacheObject, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { parseCookies } from 'nookies';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { isEqual, merge } from 'lodash';
// import WebSocket from 'ws';

let apolloClient: ApolloClient<NormalizedCacheObject>;

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

const createApolloClient = (ctx?: GetServerSidePropsContext) => {
  const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
  });

  const wsLink =
    typeof window !== 'undefined'
      ? new GraphQLWsLink(
          createClient({
            url: 'ws://localhost:4000/graphql',
          })
        )
      : null;

  const link =
    typeof window !== 'undefined' && wsLink != null
      ? split(
          ({ query }) => {
            const def = getMainDefinition(query);
            return (
              def.kind === 'OperationDefinition' &&
              def.operation === 'subscription'
            );
          },
          wsLink,
          httpLink
        )
      : httpLink;

  const authLink = setContext((_, { headers }) => {
    const { 'acesse-token': token } = ctx ? parseCookies(ctx) : parseCookies();

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(link),
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });
};

export function initializeApollo(
  initialState: NormalizedCacheObject = {},
  ctx?: GetServerSidePropsContext
) {
  // serve para verificar se já existe uma instância, para não criar outra.
  const apolloClientGlobal = apolloClient ?? createApolloClient(ctx);

  // se ja existe um estado inicial ele restaura para dentro do global (recupera os dados de cache)
  if (initialState) {
    const existingCache = apolloClientGlobal.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray: any, sourceArray: any) => [
        ...sourceArray,
        ...destinationArray.filter((d: any) =>
          sourceArray.every((s: any) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    apolloClientGlobal.cache.restore(data);
  }

  // se estiver no ssr retornar o apolloClientGlobal direto (sempre inicializando no SSR com cache limpo)
  if (typeof window === 'undefined') return apolloClientGlobal;

  // se não estiver no SSR verifica e pega o apolloClient que tinha antes ou o apolloClientGlobal
  apolloClient = apolloClient ?? apolloClientGlobal;

  // por fim retorna o objeto do apolloClient
  return apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

// utilizando um memorize para caso o initialState nao mudar nao ficar reinicializando
export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
