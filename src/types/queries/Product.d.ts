import { AdditionalItem } from '../AdditionalItem';
import { Product } from '../Product';

export interface GetProductsData {
  getProducts: Product[];
}

export interface GetAdditionalItemsData {
  getAdditional: AdditionalItem[];
}

export interface OnNewAdditionalData {
  newAdditional: { data: AdditionalItem[] };
}
