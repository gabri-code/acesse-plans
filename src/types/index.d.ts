import { AdditionalItem } from './AdditionalItem';
import { CommissionMode } from './CommissionMode';
import { Commissions } from './Commissions';
import { Customer } from './Customer';
import { Indicator } from './Indicator';
import { PreCustomer } from './PreCustomer';
import { PreIndicator } from './PreIndicator';
import { PreUser } from './PreUser';
import { Product } from './Product';
import { User } from './User';

export interface ErrorResponse {
  field?: string;
  message: string;
}

interface CustomerAuth {
  token: string;
  user: Customer | PreCustomer;
  error: ErrorResponse;
}

interface IndicatorAuth {
  token: string;
  user: Indicator | PreIndicator;
  error: ErrorResponse;
}

interface AdminAuth {
  token: string;
  user: User;
  error: ErrorResponse;
}
interface SignUp {
  user?: User;
  error?: ErrorResponse;
}

interface SignIn {
  email: string;
  password: string;
}

interface City {
  Uf: string;
  Municipio: string;
  Bairro: string;
  Logradouro: string;
  Cep: string;
  Complemento: string;
  Nome: string;
}

interface CEPResponse {
  data?: City;
  error?: ErrorResponse;
}

interface PreRegister {
  status: 'ok' | 'error';
  message?: string;
  error?: ErrorResponse;
}

interface ProductResponse {
  data?: Product;
  error?: ErrorResponse;
}

export type RolesPT = {
  admin?: string;
  indicator?: string;
  customer?: string;
};

export type Role = 'admin' | 'indicator';

export enum CustomerStatus {
  pending = 'pending',
  canceled = 'canceled',
  approved = 'approved',
}

export {
  AdditionalItem,
  CommissionMode,
  Commissions,
  Customer,
  PreUser,
  Product,
  User,
  CustomerAuth,
  SignUp,
  PreUserStart,
  CEPResponse,
  ProductResponse,
  PreRegister,
  IndicatorAuth,
  AdminAuth,
};
