export interface OdometerDigit {
  curr: number;
  next: number;
  totalRotationCount: number;
  currRotationIndex: number;
  div: HTMLDivElement;
}

export interface OdometerData {
  dataRefreshRate: number;
  digitCount: number;
  startNumber: number;
  endNumber: number;
}

export interface EgtWinners {
  winUser: string;
  winAmount: number;
  winDate: string;
}

export interface EgtJackpot {
  currency: string;

  currentLevelI: number;
  winsLevelI: number;
  largestWinLevelI: number;
  largestWinDateLevelI: string;
  largestWinUserLevelI: string;
  lastWinLevelI: number;
  lastWinDateLevelI: string;
  lastWinUserLevelI: string;
  topMonthlyWinnersLevelI: Array<EgtWinners>;
  topYearlyWinnersLevelI: Array<EgtWinners>;

  currentLevelII: number;
  winsLevelII: number;
  largestWinLevelII: number;
  largestWinDateLevelII: string;
  largestWinUserLevelII: string;
  lastWinLevelII: number;
  lastWinDateLevelII: string;
  lastWinUserLevelII: string;
  topMonthlyWinnersLevelII: Array<EgtWinners>;
  topYearlyWinnersLevelII: Array<EgtWinners>;

  currentLevelIII: number;
  winsLevelIII: number;
  largestWinLevelIII: number;
  largestWinDateLevelIII: string;
  largestWinUserLevelIII: string;
  lastWinLevelIII: number;
  lastWinDateLevelIII: string;
  lastWinUserLevelIII: string;
  topMonthlyWinnersLevelIII: Array<EgtWinners>;
  topYearlyWinnersLevelIII: Array<EgtWinners>;

  currentLevelIV: number;
  winsLevelIV: number;
  largestWinLevelIV: number;
  largestWinDateLevelIV: string;
  largestWinUserLevelIV: string;
  lastWinLevelIV: number;
  lastWinDateLevelIV: string;
  lastWinUserLevelIV: string;
  topMonthlyWinnersLevelIV: Array<EgtWinners>;
  topYearlyWinnersLevelIV: Array<EgtWinners>;
}

export interface EgtOdometerConfig {
  index: number;
  icon: string;
  listenToAnimation: boolean;
  level: string;
}
