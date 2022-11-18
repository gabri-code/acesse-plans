import 'moment/locale/pt-br';
import React, { FC, ReactNode, useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useSubscription } from '@apollo/client';
import { notification } from 'antd';
import { Flex, Grid, GridItem } from '@chakra-ui/react';
import Header from '../../components/Header';
import { HeadComponent } from '../../components/Head';
import { NEW_REGISTER_SUBSCRIPTION } from '../../graphql/subscriptions/registerNotification';
import Sidebar from '../../components/SideBar';
import NextBreadcrumbs from '../../components/NextBreadcrumb';

// type MenuItem = Required<MenuProps>['items'][number];

const DefaultLayout: FC<{ children: ReactNode; title: string }> = ({
  title,
  children,
}) => {
  const router = useRouter();

  const [current, setCurrent] = useState(router.pathname);

  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
  }, [router, current]);

  const { data } = useSubscription(NEW_REGISTER_SUBSCRIPTION);

  const openNotification = useCallback(() => {
    const {
      newRegister: { message },
    } = data;
    notification['info']({
      message: 'Novo cadastro concluído',
      description: message,
      duration: 8,
      placement: 'bottomRight',
      // onClick: () => {
      //   console.log('Notification Clicked!');
      // },
    });
  }, [data]);

  useEffect(() => {
    if (data) {
      openNotification();
    }
  }, [data, openNotification]);

  return (
    <>
      <HeadComponent title={title} />
      <Grid
        templateAreas={`"header header"
                        "nav main"
                        "nav footer"`}
        gridTemplateRows={'50px 1fr 30px'}
        gridTemplateColumns={'auto 100%'}
        minH="100vh"
      >
        <GridItem area={'header'}>
          <Header />
        </GridItem>
        <GridItem area={'nav'}>
          <Sidebar />
        </GridItem>
        <GridItem area={'main'} pl="60px">
          {router.pathname !== '/' && (
            <Flex
              h="40px"
              bg="#fff"
              align="center"
              pl="10px"
              borderBottom="1px solid rgba(0, 0, 0, 0.1)"
            >
              <NextBreadcrumbs />
            </Flex>
          )}
          <Flex paddingX="120px" bg="#f4f3f2" h="100%" pt="50px">
            <Flex bg="#fff" p="15px" w="100%" borderRadius="5px">
              {children}
            </Flex>
          </Flex>
        </GridItem>
        <GridItem area={'footer'}>Footer</GridItem>
      </Grid>
    </>
  );
};

export default DefaultLayout;
