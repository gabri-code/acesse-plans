import 'moment/locale/pt-br';
import {
  MdAdminPanelSettings,
  MdContactPage,
  MdOutlineDashboard,
} from 'react-icons/md';
import React, { FC, ReactNode, useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useSubscription } from '@apollo/client';
import { notification } from 'antd';
import {
  StyledLayout,
  StyledLayoutContent,
  StyledLogo,
  StyledSider,
  StyledSiderMenu,
  StyledSiderMenuItem,
} from './style';
import Header from '../../components/Header';
import { HeadComponent } from '../../components/Head';
import { NEW_REGISTER_SUBSCRIPTION } from '../../graphql/subscriptions/registerNotification';

// type MenuItem = Required<MenuProps>['items'][number];

const DefaultLayout: FC<{ children: ReactNode; title: string }> = ({
  title,
  children,
}) => {
  const router = useRouter();

  const [current, setCurrent] = useState(router.pathname);

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

  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
  }, [router, current]);

  function handleClick(e: MenuInfo) {
    setCurrent(e.key);
  }

  return (
    <>
      <HeadComponent title={title} />
      <StyledLayout>
        <StyledSider collapsed>
          <StyledLogo />
          <StyledSiderMenu
            theme="dark"
            onClick={handleClick}
            mode="vertical"
            selectedKeys={[current]}
          >
            <StyledSiderMenuItem
              key="/"
              title="Painel de Controle"
              icon={<MdOutlineDashboard size={30} />}
              home={true}
              onClick={() => router.push('/')}
            />
            <StyledSiderMenuItem
              key="/gerenciamento-usuarios"
              title="Gerenciar usuários"
              icon={<MdAdminPanelSettings size={30} />}
              onClick={() => router.push('/gerenciamento-usuarios')}
            />
            <StyledSiderMenuItem
              key="/gerenciamento-clientes"
              title="Gerenciar clientes"
              icon={<MdContactPage size={30} />}
              onClick={() => router.push('/')}
            />
          </StyledSiderMenu>
        </StyledSider>
        <StyledLayoutContent>
          <Header title={title} />
          {children}
        </StyledLayoutContent>
      </StyledLayout>
    </>
  );
};

export default DefaultLayout;
