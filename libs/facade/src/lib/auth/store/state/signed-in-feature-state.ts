import { PersonalData } from '../../entity';

export type SignedInFeatureState = PersonalData;

export type CaptchaState = {
  captchaCode?: string;
  isCaptchaCheckedSuccess?: boolean;
};
