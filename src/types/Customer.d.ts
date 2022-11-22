import { Commissions } from './Commissions';
import { User } from './User';

export interface Customer {
  id: string;
  email: string;
  fullName: string;
  address: string;
  phone: string;
  cpf_cnpj: string;
  createdAt: Date;
  updatedAt: Date;
  indicator?: User | null;
  indicatorId: string;
  status: 'pending' | 'canceled' | 'approved';
  commissions?: Commissions[];
  _count?: CustomerCount | null;
}

export interface CustomerCount {
  commissions: number;
}
