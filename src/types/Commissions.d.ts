import { Customer } from './Customer';
import { User } from './User';

export interface Commissions {
  user?: User;
  customer?: Customer;
  createdAt: Date;
  userId: string;
  customerId: string;
}
