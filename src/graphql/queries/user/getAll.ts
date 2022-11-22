import { gql } from '@apollo/client';

export const GET_ALL_USERS_QUERY = gql`
  query GetAllUsers($skip: Float, $take: Float) {
    getAllUsers(skip: $skip, take: $take) {
      count
      data {
        active
        address
        commissions {
          createdAt
        }
        createdAt
        email
        fullName
        phone
        picture
        role
        updatedAt
        id
      }
    }
  }
`;
