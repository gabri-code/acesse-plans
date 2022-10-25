import { gql } from '@apollo/client';

export const SIGNOUT_MUTATION = gql`
  mutation UserSignOut($id: String!) {
    signOut(id: $id) {
      id
    }
  }
`;
