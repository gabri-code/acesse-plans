import { gql } from '@apollo/client';

export const ADDITIONAL_ITEM_MUTATION = gql`
  mutation CreateAdditionalItem($data: AdditionalItemCreateInput!) {
    createAdditionalItem(data: $data) {
      id
      icon
      name
    }
  }
`;
