import { gql } from '@apollo/client';

export const NEW_ADDITIONAL_SUBSCRIPTION = gql`
  subscription NewAdditional {
    newAdditional {
      data {
        icon
        id
        name
      }
    }
  }
`;
