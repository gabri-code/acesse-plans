export interface PreCustomer {
  id: string;
  fullName: string;
  password?: string;
  email: string;
  role: 'admin' | 'indicator' | 'customer';
}
