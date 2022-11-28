import { Commissions } from './Commissions';
import { Indicator } from './Indicator';
import { Purchases } from './Purchases';

export interface Customer {
  id: string;
  email: string;
  fullName: string;
  address: string;
  phone: string;
  cpf_cnpj: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'pending' | 'canceled' | 'approved';
  indicatorId: string;
  password?: string;
  role: 'admin' | 'indicator' | 'customer';
  indicator?: Indicator;
  commissions?: Commissions[];
  purchases?: Purchases[];
  _count?: CustomerCount | null;
}

export interface CustomerCount {
  commissions: number;
  purchases: number;
}
