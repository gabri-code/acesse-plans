import { createContext, FC, ReactNode, useState } from 'react';
import { PreUserResponse, UserRegister } from '../types';

type UserRegisterContextType = {
  preUser: PreUserResponse | null;
  dataRegister: Partial<UserRegister> | null;
  handlePreUser: (data: PreUserResponse) => void;
  handleDataRegister: (data: Partial<UserRegister>) => void;
};

type UserRegisterProviderType = {
  children: ReactNode;
};

export const UserRegisterContext = createContext({} as UserRegisterContextType);

export const UserRegisterProvider: FC<UserRegisterProviderType> = ({
  children,
}) => {
  const [preUser, setPreUser] = useState<PreUserResponse | null>(null);
  const [dataRegister, setDataRegister] =
    useState<Partial<UserRegister> | null>(null);

  const handlePreUser = (data: PreUserResponse) => setPreUser(data);

  const handleDataRegister = (data: Partial<UserRegister>) =>
    setDataRegister(data);

  return (
    <UserRegisterContext.Provider
      value={{
        handlePreUser,
        handleDataRegister,
        preUser,
        dataRegister,
      }}
    >
      {children}
    </UserRegisterContext.Provider>
  );
};
