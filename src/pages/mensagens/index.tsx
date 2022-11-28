import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { Flex, VStack } from '@chakra-ui/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { FC } from 'react';
import DefaultLayout from '../../layouts/Default';
import { User } from '../../types';
import { requireAuthentication } from '../../utils/requireAuthentication';

interface PageProps {
  title: string;
}

const MessagesPage: FC<PageProps> = ({ title }) => {
  return (
    <DefaultLayout title={title}>
      <Flex>
        <VStack></VStack>
      </Flex>
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return requireAuthentication(
    context,
    async (client: ApolloClient<NormalizedCacheObject>, user: User) => {
      const defaultProps = {
        title: 'Mensagens',
        user,
      };

      try {
        return {
          props: {
            ...defaultProps,
          },
        };
      } catch (e) {
        console.log(e);
        return {
          props: defaultProps,
        };
      }
    }
  );
};

export default MessagesPage;
