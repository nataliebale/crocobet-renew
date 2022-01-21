import { ImageSlide } from '@crc/components';

export type BannerExtraInfo = {
  title: string;
  desc: string;
  showCountDown?: boolean;
  countdownDayCount?: number;
  countdownTime?: number;
};

export type BannerInfo = ImageSlide & BannerExtraInfo;
