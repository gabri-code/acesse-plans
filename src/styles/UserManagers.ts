import { Badge, Button } from 'antd';
import styled from 'styled-components';

export const NewUserButton = styled(Button)`
  align-self: flex-start;
`;

type UserAvatarProps = {
  userOnline: boolean;
};

export const UserAvatarStatus = styled(Badge)<UserAvatarProps>`
  padding: 2px;
  background-color: ${({ userOnline }) => (userOnline ? '#1cfa03' : '#f52c2c')};
  border-radius: 50%;
`;
