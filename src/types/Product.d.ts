import { AdditionalItem } from './AdditionalItem';
import { Indicator } from './Indicator';
import { Purchases } from './Purchases';

export interface Product {
  promotionalPrice?: number | null;
  active: boolean;
  installationNormal?: number | null;
  installationFidelity?: number | null;
  price: number;
  id: number;
  title: string;
  type: 'internet' | 'tv' | 'others';
  affiliated?: Indicator[];
  additionalItems?: AdditionalItem[];
  purchases?: Purchases[];
  _count?: ProductCount | null;
}

export interface ProductCount {
  affiliated: number;
  additionalItems: number;
  purchases: number;
}
