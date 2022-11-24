import { useEffect, useState } from 'react';
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FiMenu,
  FiHome,
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiBriefcase,
  FiSettings,
} from 'react-icons/fi';
import { IoPawOutline } from 'react-icons/io5';
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

export default function Sidebar() {
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
          title="Painel de Controle"
          icon={router.pathname === '/' ? MdDashboard : MdOutlineDashboard}
          collapsed={collapsed}
          active={router.pathname === '/'}
        />
        <NavItem
          href="/mercadao"
          title="Mercadão"
          icon={router.pathname === '/mercadao' ? MdStore : MdOutlineStore}
          collapsed={collapsed}
          active={router.pathname === '/mercadao'}
        />
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
        <NavItem
          href="/mensagens"
          title="Mensagens"
          icon={router.pathname === '/mensagens' ? MdMessage : MdOutlineMessage}
          collapsed={collapsed}
          active={router.pathname === '/mensagens'}
        />
      </Flex>
    </Flex>
  );
}
