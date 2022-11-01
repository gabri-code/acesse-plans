import { gql } from '@apollo/client';

export const GET_PRE_USERS_QUERY = gql`
  query GetPreUsers {
    getPreUsers {
      email
      id
      role
    }
  }
`;
