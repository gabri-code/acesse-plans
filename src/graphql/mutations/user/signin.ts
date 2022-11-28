import { gql } from '@apollo/client';

export const SIGNIN_MUTATION = gql`
  mutation SignIn($role: Roles!, $data: LoginUserInput!) {
    signIn(role: $role, data: $data) {
      token
      error {
        field
        message
      }
      user {
        ... on Customer {
          id
          email
          fullName
          address
          cpf_cnpj
        }
        ... on Indicator {
          active
          email
          fullName
          picture
          id
        }
        ... on PreIndicator {
          email
          fullName
          registerStatus
          id
        }
        ... on PreCustomer {
          id
          role
          email
          fullName
        }
        ... on User {
          id
          role
        }
      }
    }
  }
`;
