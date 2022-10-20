import 'moment/locale/pt-br';
import {
  MdAdminPanelSettings,
  MdContactPage,
  MdOutlineDashboard,
} from 'react-icons/md';
import React, { FC, ReactNode } from 'react';

import {
  StyledLayout,
  StyledLayoutContent,
  StyledLogo,
  StyledSider,
  StyledSiderMenu,
  StyledSiderMenuItem,
} from './style';
import { IPageProps } from '../../pages';
import { useRouter } from 'next/router';
import Header from '../../components/Header';

// type MenuItem = Required<MenuProps>['items'][number];

const DefaultLayout: FC<IPageProps & { children: ReactNode }> = ({
  title,
  user,
  children,
}) => {
  const router = useRouter();

  return (
    <StyledLayout>
      <StyledSider collapsed>
        <StyledLogo />
        <StyledSiderMenu
          theme="dark"
          defaultSelectedKeys={['dashboard']}
          mode="inline"
        >
          <StyledSiderMenuItem
            key="dashboard"
            title="Painel de Controle"
            icon={<MdOutlineDashboard size={30} />}
            home
            onClick={() => router.push('/')}
          />
          <StyledSiderMenuItem
            key="users_manager"
            title="Gerenciar usuários"
            icon={<MdAdminPanelSettings size={30} />}
            onClick={() => router.push('/')}
          />
          <StyledSiderMenuItem
            key="customers"
            title="Gerenciar clientes"
            icon={<MdContactPage size={30} />}
            onClick={() => router.push('/')}
          />
        </StyledSiderMenu>
      </StyledSider>
      <StyledLayoutContent>
        <Header user={user} title={title} />
        {children}
      </StyledLayoutContent>
    </StyledLayout>
  );
};

export default DefaultLayout;
