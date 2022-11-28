import { Indicator } from './Indicator';

export interface ReferIndicator {
  id: string;
  referrer?: string | null;
  referred?: string | null;
  User_ReferIndicator_referredToUser?: Indicator | null;
  User_ReferIndicator_referrerToUser?: Indicator | null;
}
