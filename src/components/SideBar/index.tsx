import { useEffect, useState } from 'react';
import { Flex, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {
  MdAdminPanelSettings,
  MdContactPage,
  MdDashboard,
  MdDashboardCustomize,
  MdMessage,
  MdOutlineAdminPanelSettings,
  MdOutlineContactPage,
  MdOutlineDashboard,
  MdOutlineDashboardCustomize,
  MdOutlineMessage,
  MdOutlineStore,
  MdStore,
} from 'react-icons/md';
import NavItem from '../NavItem';
import { PrivateComponent } from '../PrivateComponent';

interface SBProps {
  token: string;
}

export default function Sidebar({ token }: SBProps) {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });

  const router = useRouter();

  const [current, setCurrent] = useState(router.pathname);

  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
  }, [router, current]);

  const collapsed = !isOpen;

  return (
    <Flex
      pos="fixed"
      {...(!collapsed && { boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.05)' })}
      w={collapsed ? '60px' : '300px'}
      flexDir="column"
      justifyContent="space-between"
      borderRight="1px solid rgba(0, 0, 0, 0.1)"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      zIndex={999}
      bg="#fff"
      minH="100%"
    >
      <Flex
        paddingX="5px"
        flexDir="column"
        w="100%"
        alignItems={collapsed ? 'center' : 'flex-start'}
        as="nav"
      >
        <NavItem
          href="/"
          title="Mercadão"
          icon={router.pathname === '/' ? MdStore : MdOutlineStore}
          collapsed={collapsed}
          active={router.pathname === '/'}
        />
        <PrivateComponent token={token} roles={['admin', 'indicator']}>
          <NavItem
            href="/painel"
            title="Painel de Controle"
            icon={
              router.pathname === '/painel' ? MdDashboard : MdOutlineDashboard
            }
            collapsed={collapsed}
            active={router.pathname === '/painel'}
          />
        </PrivateComponent>
        <PrivateComponent token={token} roles={['admin']}>
          <NavItem
            href="/gerenciamento-usuarios"
            title="Gerenciar usuários"
            icon={
              router.pathname === '/gerenciamento-usuarios'
                ? MdAdminPanelSettings
                : MdOutlineAdminPanelSettings
            }
            collapsed={collapsed}
            active={router.pathname === '/gerenciamento-usuarios'}
          />
        </PrivateComponent>
        <PrivateComponent token={token} roles={['admin']}>
          <NavItem
            href="/gerenciamento-clientes"
            title="Gerenciar clientes"
            icon={
              router.pathname === '/gerenciamento-clientes'
                ? MdContactPage
                : MdOutlineContactPage
            }
            collapsed={collapsed}
            active={router.pathname === '/gerenciamento-clientes'}
          />
        </PrivateComponent>
        <PrivateComponent token={token} roles={['admin']}>
          <NavItem
            href="/gerenciamento-produtos"
            title="Gerenciar produtos"
            icon={
              router.pathname === '/gerenciamento-produtos'
                ? MdDashboardCustomize
                : MdOutlineDashboardCustomize
            }
            collapsed={collapsed}
            active={router.pathname === '/gerenciamento-produtos'}
          />
        </PrivateComponent>
        <PrivateComponent
          token={token}
          roles={['admin', 'customer', 'indicator']}
        >
          <NavItem
            href="/mensagens"
            title="Mensagens"
            icon={
              router.pathname === '/mensagens' ? MdMessage : MdOutlineMessage
            }
            collapsed={collapsed}
            active={router.pathname === '/mensagens'}
          />
        </PrivateComponent>
      </Flex>
    </Flex>
  );
}
