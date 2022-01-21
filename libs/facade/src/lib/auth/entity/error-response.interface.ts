export interface LoginErrorResponse {
  code: number;
  captcha?: string;
  loginName?: string;
  description?: string;
}
