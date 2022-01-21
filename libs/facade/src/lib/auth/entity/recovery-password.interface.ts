export interface RecoveryPassword {
  customerId: string;
  oldValue: string;
  newValue: string;
  valueName: 'password';
}
