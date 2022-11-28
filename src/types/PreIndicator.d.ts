export interface PreIndicator {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  role: 'admin' | 'indicator' | 'customer';
  registerStatus: 'approved' | 'denied' | 'pending';
  otp?: number | null;
  otpCreatedAt?: Date | null;
  otpExpiresAt?: Date | null;
}
