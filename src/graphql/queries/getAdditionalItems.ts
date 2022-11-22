import { gql } from '@apollo/client';

export const GET_ADDITIONAL_ITEMS_QUERY = gql`
  query GetAdditional {
    getAdditional {
      id
      icon
      name
    }
  }
`;
