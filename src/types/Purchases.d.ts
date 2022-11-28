import { Customer } from './Customer';
import { Indicator } from './Indicator';
import { Product } from './Product';

export interface Purchases {
  id: string;
  customerId: string;
  indicatorId?: string | null;
  customer?: Customer;
  indicator?: Indicator | null;
  product?: Product[];
  _count?: PurchasesCount | null;
}

export interface PurchasesCount {
  product: number;
}
