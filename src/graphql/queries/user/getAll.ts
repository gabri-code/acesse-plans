import { gql } from '@apollo/client';

export const GET_ALL_USERS_QUERY = gql`
  query GetAllUsers {
    getAllUsers {
      active
      address
      commissions
      createdAt
      email
      fullName
      phone
      picture
      roles
      updatedAt
      id
    }
  }
`;
