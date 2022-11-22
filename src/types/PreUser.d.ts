export interface PreUser {
  id: string;
  email: string;
  role: 'admin' | 'indicator';
  otp?: string | null;
  otpCreatedAt: string;
  otpExpiresAt: string;
}
