export interface ResetPassword {
  mobile: string;
}

export interface ResetPasswordVerify {
  mobile: string;
  password: string;
  verificationCode: string;
}
