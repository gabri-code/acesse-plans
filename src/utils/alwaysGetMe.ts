import { GetServerSidePropsContext } from "next";
import { initializeApollo } from "../graphql/client";
import { GET_ME_QUERY } from "../graphql/queries/user/getMe";

export const getMe = async (token: string, ctx?: GetServerSidePropsContext) => {
  const apolloClient = initializeApollo({}, ctx);

  const { data } = await apolloClient.query({
    query: GET_ME_QUERY,
  });
}