export interface Promocode {
  valid: boolean;
  prize?: Prize;
}

export interface PromoCodeCheck {
  success?: boolean;
  prize?: Prize;
  loading?: boolean;
}

export interface Prize {
  id: number;
  name: string;
  type: string;
  amount: number;
}

export interface PromocodeRedeem {
  code: string;
}
