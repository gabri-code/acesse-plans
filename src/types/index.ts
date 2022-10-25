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
  role: Role[];
  customers: CustomerModel[];
  commissions: number;
}

export type MainResponse = {
  user: UserResponse;
  token: string;
};
