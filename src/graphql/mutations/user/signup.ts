import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
  mutation UserSignUp($data: UserCreateInput!) {
    signUp(data: $data) {
      user {
        id
      }
      error {
        message
        field
      }
    }
  }
`;
