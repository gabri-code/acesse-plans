export enum CustomerStatus {
  pending = 'pending',
  canceled = 'canceled',
  aproved = 'aproved',
}

export type CustomerModel = {
  id: string;
  fullName: string;
  email: string;
  address: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  seller: UserResponse;
  status: CustomerStatus;
};

export interface UserLogin {
  email: string;
  password: string;
}

export type Role = 'admin' | 'manager' | 'seller' | 'test';

export interface UserResponse {
  id: string;
  fullName: string;
  email: string;
  address: string;
  phone: string;
  picture: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  roles: Role[];
  customers: CustomerModel[];
  commissions: number;
}

export interface PreUserResponse {
  id: string;
  email: string;
  roles: Role[];
}

export type MainResponse = {
  user: UserResponse;
  token: string;
};

export type UserRegister = {
  fullName: string;
  email: string;
  birthDay: Date;
  cpf: string;
  password: string;
  phone: string;
  address: string;
  picture: string;
  roles: Role[];
  // bank: string;
  // bankAccount: string;
  // bankAgency: string;
};
