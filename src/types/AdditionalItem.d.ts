import { Product } from './Product';

export interface AdditionalItem {
  id: number;
  icon: string;
  name: string;
  products?: Product[];
  _count?: AdditionalItemCount | null;
}

export interface AdditionalItemCount {
  products: number;
}
