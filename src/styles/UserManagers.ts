import { Badge, BadgeProps, Button, Layout, Space, Typography } from 'antd';
import styled from 'styled-components';

export const NewUserButton = styled(Button)`
  align-self: flex-start;
  margin-bottom: 30px;
`;

interface UserAvatarProps extends BadgeProps {
  isOnline?: boolean;
}

export const UserAvatarStatus = styled(Badge)<UserAvatarProps>`
  padding: 2px;
  background-color: ${({ isOnline }) => (isOnline ? '#1cfa03' : '#f52c2c')};
  border-radius: 50%;
`;

export const TableWraper = styled(Space)`
  width: 100%;
`;

export const TableTitle = styled(Typography.Title)``;
