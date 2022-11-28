import { Commissions } from './Commissions';
import { Customer } from './Customer';

export interface User {
  id: string;
  email: string;
  cpf: string;
  password?: string;
  fullName: string;
  address: string;
  phone: string;
  birthDay: Date;
  active?: boolean | null;
  picture: string;
  createdAt: Date;
  updatedAt: Date;
  role: 'admin' | 'indicator' | 'customer';
}

export interface UserCount {
  customers: number;
  commissions: number;
}
