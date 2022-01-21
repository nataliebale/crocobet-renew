export interface Weekly {
  position: string;
  user: string;
  prize: string | number;
}

export interface Tournament {
  name: string;
  gameType: string;
  startDate: Date;
  registrationPrice: number;
  prizeMoney: number;
}
