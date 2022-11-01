import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
  mutation UserSignUp($data: CreateUserInput!) {
    signUp(data: $data) {
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
