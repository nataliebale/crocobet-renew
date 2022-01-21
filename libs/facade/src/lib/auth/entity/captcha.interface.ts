export interface EnteredCaptchaModel {
  login: string;
  captcha: string;
}

export interface CaptchaCheckResponse {
  code: number;
  data: boolean;
}
