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
  role: 'admin' | 'indicator';
  customers?: Customer[];
  commissions?: Commissions[];
  _count?: UserCount | null;
}

export interface UserCount {
  customers: number;
  commissions: number;
}
