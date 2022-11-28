import { parseCookies } from 'nookies';
import { ElementType, FC, ReactNode, useContext } from 'react';
import jwt from 'jwt-decode';
import { Role } from '../../types';

interface PCProps {
  children: ReactNode;
  roles: string[];
  token: string;
}

export interface TokenPayload {
  exp: number;
  iat: number;
  id: string;
  role: Role;
}

export const PrivateComponent: FC<PCProps> = ({
  children,
  roles,
  token,
  ...rest
}) => {
  if (!token) return null;

  const { role } = jwt(token) as TokenPayload;

  if ((token && (roles && roles.indexOf(role)) === -1) || !token) {
    return null;
  }

  return <>{children}</>;
};
