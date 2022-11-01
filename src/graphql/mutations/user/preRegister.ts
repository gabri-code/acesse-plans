import { gql } from '@apollo/client';

export const PRE_USER_REGISTER_MUTATION = gql`
  mutation PreUserSignUp($data: PreCreateUserInput!) {
    preSignUp(data: $data) {
      status
      message
      data {
        id
      }
    }
  }
`;

export const PRE_SIGNUP_VERIFICATION_MUTATION = gql`
  mutation PreSignUpVerification($data: PreUserVerificationInput!) {
    preSignUpVerification(data: $data) {
      status
      message
      field
      data {
        id
        email
        role
      }
    }
  }
`;

export const PRE_SIGNUP_VALIDATION_MUTATION = gql`
  mutation SignupVerification($data: SignUpVerificationInput!) {
    signUpVerification(data: $data) {
      id
      email
      role
    }
  }
`;

export const RESEND_OTP_MUTATION = gql`
  mutation ReSendOTP($data: PreUserVerificationInput!) {
    reSendValidationCode(data: $data) {
      id
    }
  }
`;
