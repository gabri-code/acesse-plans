import { gql } from '@apollo/client';

export const GET_LOCATION_QUERY = gql`
  query GetCity($cep: String!) {
    getCityFromCEP(cep: $cep) {
      data {
        Bairro
        Cep
        Complemento
        Logradouro
        Municipio
        Nome
        Uf
      }
      error
    }
  }
`;
