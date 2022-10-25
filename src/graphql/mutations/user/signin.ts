import { gql } from '@apollo/client';

export const SIGNIN_MUTATION = gql`
  mutation UserSignin($data: LoginUserInput!) {
    signIn(data: $data) {
      user {
        fullName
      }
      token
    }
  }
`;
