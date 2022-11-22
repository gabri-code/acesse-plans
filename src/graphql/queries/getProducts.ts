import { gql } from '@apollo/client';

export const GET_PRODUCTS_QUERY = gql`
  query GetProducts {
    getProducts {
      id
      additionalItems {
        name
        icon
        id
      }
      active
      installationFidelity
      installationNormal
      title
      price
      promotionalPrice
    }
  }
`;
