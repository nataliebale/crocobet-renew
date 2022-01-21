export interface Transaction {
  transactionId: number;
  transactionSwitch: number;
  type: number;
  amount: number;
  statusCode: string;
  currencyCode: string;
  customerId: number;
  regDate: number;
  responseText: string;
}

export interface TransactionSelect {
  id: number;
  name: string;
}
