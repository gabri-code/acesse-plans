import { useMemo } from 'react';
import type { GetServerSidePropsContext } from 'next';
import { NormalizedCacheObject, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { parseCookies } from 'nookies';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
// import WebSocket from 'ws';

let apolloClient: ApolloClient<NormalizedCacheObject>;

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
    cache: new InMemoryCache(),
  });
};

export function initializeApollo(
  initialState = {},
  ctx?: GetServerSidePropsContext
) {
  // serve para verificar se já existe uma instância, para não criar outra.
  const apolloClientGlobal = apolloClient ?? createApolloClient(ctx);

  // se ja existe um estado inicial ele restaura para dentro do global (recupera os dados de cache)
  if (initialState) {
    apolloClientGlobal.cache.restore(initialState);
  }

  // se estiver no ssr retornar o apolloClientGlobal direto (sempre inicializando no SSR com cache limpo)
  if (typeof window === 'undefined') return apolloClientGlobal;

  // se não estiver no SSR verifica e pega o apolloClient que tinha antes ou o apolloClientGlobal
  apolloClient = apolloClient ?? apolloClientGlobal;

  // por fim retorna o objeto do apolloClient
  return apolloClient;
}

// utilizano um memorize para caso o initialState nao mudar nao ficar reinicializando
export function useApollo(initialState = {}) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
