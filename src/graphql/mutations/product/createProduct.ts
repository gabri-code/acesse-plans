import { gql } from '@apollo/client';

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($data: ProductCreateInput!) {
    createProduct(data: $data) {
      data {
        id
      }
      error {
        message
        field
      }
    }
  }
`;
