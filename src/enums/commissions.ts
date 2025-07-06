export interface AddCommissionReqInterface {
  amount: number;
  status: string;
  payout_date: string;
  builder_id: string;
  deal_id: string;
}

export interface UpdateCommissionReqInterface {
  amount: number;
  status: string;
  payout_date: string;
}
