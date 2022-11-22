import { AdditionalItem } from './AdditionalItem';

export interface Product {
  id: number;
  price: number;
  title: string;
  promotionalPrice?: number | null;
  active: boolean;
  installationNormal?: number | null;
  installationFidelity?: number | null;
  type: 'internet' | 'tv' | 'others';
  additionalItems?: AdditionalItem[];
  _count?: ProductCount | null;
}

export interface ProductCount {
  additionalItems: number;
}
