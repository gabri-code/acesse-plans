import { gql } from '@apollo/client';

export const USER_BY_EMAIL_QUERY = gql`
  query GetUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
    }
  }
`;
