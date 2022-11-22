export interface CommissionMode {
  mode: 'fixed' | 'percentage';
  value: number;
  active?: boolean | null;
}
