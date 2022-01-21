import { Banner } from '@crc/facade';

export type BannerWithCountDown = Banner & {
  showCountDown: boolean;
  countdownDayCount: number;
  countdownTime: number;
};
