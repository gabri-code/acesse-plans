export interface UserLogin {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  address: string;
  houseNumber: number;
  city: string;
  country: string;
  zipCode: string;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
  authenticated: boolean;
}

export interface IError {
  error: string;
}

export type MainResponse = {
  user: UserResponse;
  token: string;
};
