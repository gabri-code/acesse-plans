import { Commissions } from './Commissions';
import { Customer } from './Customer';
import { Product } from './Product';
import { Purchases } from './Purchases';
import { ReferIndicator } from './ReferIndicator';

export interface Indicator {
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
  commissions?: Commissions[];
  customers?: Customer[];
  productsAffiliated?: Product[];
  purchases?: Purchases[];
  referredToUser?: ReferIndicator | null;
  referrerToUser?: ReferIndicator[];
  _count?: IndicatorCount | null;
}

interface IndicatorCount {
  commissions: number;
  customers: number;
  productsAffiliated: number;
  purchases: number;
  referrerToUser: number;
}
