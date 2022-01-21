export interface CashierHours {
  weekday: number;
  closed: false;
  from?: string;
  until?: string;
}

export interface CashierPlace {
  city: string;
  group: string;
  address: string;
  contact: string;
  coordinates: { lat: number; lon: number };
  image: string;
  t13n: boolean;
  openHours: CashierHours[];
}

export interface Cashier {
  name: string;
  places: CashierPlace[];
}
