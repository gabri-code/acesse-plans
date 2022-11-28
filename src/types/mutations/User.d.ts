import { AdminAuth, CustomerAuth, IndicatorAuth, PreRegister } from '..';

export interface PreUserRegisterData {
  preSignUp: PreRegister;
}

export interface CustomerSignInData {
  signIn: CustomerAuth;
}

export interface IndicatorSignInData {
  signIn: IndicatorAuth;
}

export interface AdminSignInData {
  signIn: AdminAuth;
}
