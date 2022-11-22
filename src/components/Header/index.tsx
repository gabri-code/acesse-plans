import { BellOutlined, LogoutOutlined } from '@ant-design/icons';
import { FC, useContext } from 'react';
import {
  Avatar,
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
import {
  StyledBadgeNotification,
  StyledBadgeUser,
  StyledHeader,
  StyledPageTitle,
} from './style';
import { AuthContext } from '../../contexts/AuthContext';

const Header: FC = ({}) => {
  const { signOut, user } = useContext(AuthContext);

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
      </HStack>
    </Flex>
  );
};

export default Header;
