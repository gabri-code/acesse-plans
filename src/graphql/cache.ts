import { InMemoryCache, makeVar } from '@apollo/client';
import { UserResponse } from '../types';

export const userVar = makeVar<UserResponse | null>(null);

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    User: {
      keyFields: ['id', 'fullName', 'picture', 'active'],
    },
  },
});
