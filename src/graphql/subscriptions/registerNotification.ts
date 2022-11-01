import { gql } from '@apollo/client';

export const NEW_REGISTER_SUBSCRIPTION = gql`
  subscription OnNewRegister {
    newRegister {
      message
    }
  }
`;
