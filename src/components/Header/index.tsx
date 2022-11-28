import { BellOutlined, LogoutOutlined } from '@ant-design/icons';
import { FC, useContext } from 'react';
import {
  Avatar,
  Button,
  Center,
  Flex,
  HStack,
  IconButton,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { IoEnterOutline } from 'react-icons/io5';
import { Router, useRouter } from 'next/router';
import { AuthContext } from '../../contexts/AuthContext';

interface HeaderProps {
  isAuthenticated: boolean;
}

const Header: FC<HeaderProps> = ({ isAuthenticated }) => {
  const { signOut, user } = useContext(AuthContext);

  const router = useRouter();

  const handleSignOut = async () => {
    if (user) await signOut(user.id);
  };

  return (
    <Flex
      justify="space-between"
      h="50px"
      minW="100%"
      borderBottom="1px solid rgba(0, 0, 0, 0.1)"
      pos="fixed"
      paddingX="20px"
      bg="#fff"
      zIndex={997}
    >
      <Center w="100px">
        <Img src="images/indicash.svg" alt="logo indicash" w="100%" />
      </Center>
      <HStack>
        {/* <StyledBadgeNotification dot>
          <BellOutlined
            style={{ fontSize: 20 }}
            onClick={() => console.log('notificação')}
          />
        </StyledBadgeNotification> */}
        {isAuthenticated ? (
          <Menu>
            <MenuButton
              as={IconButton}
              icon={
                <Avatar name={user?.fullName} src={user?.picture} size="sm" />
              }
              variant="ghost"
              borderRadius="100%"
            />
            <MenuList>
              <MenuItem icon={<LogoutOutlined />} onClick={handleSignOut}>
                Desconectar
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<IoEnterOutline size={20} />}
              colorScheme="orange"
              variant="outline"
            >
              Entrar
            </MenuButton>
            <MenuList padding={0}>
              <MenuItem onClick={() => router.push('/customer-signin')}>
                Sou cliente
              </MenuItem>
              <MenuItem onClick={() => router.push('/app-signin')}>
                Sou afiliado
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </HStack>
    </Flex>
  );
};

export default Header;
