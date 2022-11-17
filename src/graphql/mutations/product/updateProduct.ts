import { gql } from '@apollo/client';

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($id: Float!, $data: UpdateProductInput!) {
    updateProduct(id: $id, data: $data) {
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
