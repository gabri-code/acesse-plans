import { Customer } from './Customer';
import { Indicator } from './Indicator';

export interface Commissions {
  createdAt: Date;
  customerId: string;
  indicatorId: string;
  customer?: Customer;
  indicator?: Indicator;
  commission: number;
}
