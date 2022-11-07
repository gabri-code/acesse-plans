import { gql } from '@apollo/client';

export const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProduct($id: Float!) {
    deleteProduct(id: $id) {
      data {
        id
      }
    }
  }
`;
