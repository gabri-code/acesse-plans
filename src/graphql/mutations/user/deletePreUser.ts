import { gql } from '@apollo/client';

export const DELETE_PRE_USER = gql`
  mutation DeletePreUser($id: String!) {
    deletePreUser(id: $id) {
      id
    }
  }
`;
