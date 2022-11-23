import { AdditionalItem } from './AdditionalItem';
import { CommissionMode } from './CommissionMode';
import { Commissions } from './Commissions';
import { Customer } from './Customer';
import { PreUser } from './PreUser';
import { Product } from './Product';
import { User } from './User';

interface ErrorResponse {
  field?: string;
  message: string;
}

interface Auth {
  token: string;
  user: User;
}

interface SignUp {
  user?: User;
  error?: ErrorResponse;
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
  admin: string;
  indicator: string;
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
  Auth,
  SignUp,
  PreUserStart,
  CEPResponse,
  ProductResponse,
  PreRegister,
};
