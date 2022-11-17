import { gql } from '@apollo/client';

export const ADDITIONAL_ITEM_MUTATION = gql`
  mutation CreateAdditionalItem($data: AdditionalItemInput!) {
    createAdditionalItem(data: $data) {
      error {
        message
        field
      }
    }
  }
`;
