import { gql } from '@apollo/client';

export const PRE_USER_REGISTER_MUTATION = gql`
  mutation CreatePreUser($data: PreUserCreateInput!) {
    preSignUp(data: $data) {
      message
      status
      error {
        field
        message
      }
    }
  }
`;

export const PRE_SIGNUP_VERIFICATION_MUTATION = gql`
  mutation PreSignUpVerification($data: PreUserVerificationInput!) {
    preSignUpVerification(data: $data) {
      error {
        message
        field
      }
      data {
        id
        email
        role
        otp
        otpCreatedAt
        otpExpiresAt
      }
    }
  }
`;
