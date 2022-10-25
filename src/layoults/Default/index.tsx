import 'moment/locale/pt-br';
import {
  MdAdminPanelSettings,
  MdContactPage,
  MdOutlineDashboard,
} from 'react-icons/md';
import React, { FC, ReactNode, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { MenuInfo } from 'rc-menu/lib/interface';
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
