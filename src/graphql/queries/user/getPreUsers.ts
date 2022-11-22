import { gql } from '@apollo/client';

export const GET_PRE_USERS_QUERY = gql`
  query GetPreUsers($skip: Float, $take: Float) {
    getPreUsers(skip: $skip, take: $take) {
      count
      data {
        email
        id
        otp
        otpCreatedAt
        otpExpiresAt
        role
      }
    }
  }
`;
