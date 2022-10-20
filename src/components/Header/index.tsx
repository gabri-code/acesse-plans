import { BellOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { FC, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { UserResponse } from '../../types';
import {
  StyledBadgeNotification,
  StyledBadgeUser,
  StyledHeader,
  StyledPageTitle,
} from './style';

interface HProps {
  user: UserResponse;
  title: string;
}

const Header: FC<HProps> = ({ user, title }) => {
  const { signOut } = useContext(AuthContext);

  const handleSignOut = async () => {
    await signOut(user.id);
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="Recommend">Recommend</Menu.Item>
      <Menu.Item key="Newest">Newest</Menu.Item>
      <Menu.Item key="Lowest Price">Lowest Price</Menu.Item>
      <Menu.Item
        key="signout"
        danger
        icon={<LogoutOutlined />}
        onClick={handleSignOut}
      >
        Desconectar
      </Menu.Item>
    </Menu>
  );

  return (
    <StyledHeader>
      <StyledPageTitle level={1}>{title}</StyledPageTitle>
      <div className="right-content">
        <StyledBadgeNotification dot>
          <BellOutlined
            style={{ fontSize: 20 }}
            onClick={() => console.log('notificação')}
          />
        </StyledBadgeNotification>
        <Dropdown overlay={userMenu} trigger={['click']}>
          <StyledBadgeUser>
            <Button shape="circle">
              <Avatar
                shape="circle"
                size={30}
                src="https://blog.unyleya.edu.br/wp-content/uploads/2017/12/saiba-como-a-educacao-ajuda-voce-a-ser-uma-pessoa-melhor.jpeg"
              />
            </Button>
          </StyledBadgeUser>
        </Dropdown>
      </div>
    </StyledHeader>
  );
};

export default Header;
