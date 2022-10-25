import { gql } from '@apollo/client';

export const GET_ME_QUERY = gql`
  query GetMe {
    getMe {
      active
      fullName
      role
      picture
      id
    }
  }
`;
