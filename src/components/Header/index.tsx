import { BellOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { FC, useContext } from 'react';
import {
  StyledBadgeNotification,
  StyledBadgeUser,
  StyledHeader,
  StyledPageTitle,
} from './style';
import { AuthContext } from '../../contexts/AuthContext';

interface HProps {
  title: string;
}

const Header: FC<HProps> = ({ title }) => {
  const { signOut, user } = useContext(AuthContext);

  const handleSignOut = async () => {
    if (user) await signOut(user.id);
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
              <Avatar shape="circle" size={30} src={user?.picture} />
            </Button>
          </StyledBadgeUser>
        </Dropdown>
      </div>
    </StyledHeader>
  );
};

export default Header;
