export interface AddBuilderReqInterface {
  name: string;
  contact_person?: string;
  email: string;
  phone_number: string;
  commission_rate: number;
}

export interface AddBuilderContactPersonReqInterface {
  name: string;
  email: string;
  phone_number: string;
}
