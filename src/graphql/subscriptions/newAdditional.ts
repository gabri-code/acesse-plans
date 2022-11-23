import { gql } from '@apollo/client';

export const NEW_ADDITIONAL_SUBSCRIPTION = gql`
  subscription OnNewAdditional {
    newAdditional {
      data {
        id
        icon
        name
      }
    }
  }
`;
