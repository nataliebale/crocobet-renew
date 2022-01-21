export const PaymentProviders = {
  BOG_DEPOSIT: 85,
  BOG_WITHDRAW: 86,
  TBC_DEPOSIT: 65,
  TBC_WITHDRAW: 66,
  ANY_DEPOSIT: 65,
  ANY_WITHDRAW: 66,

  BY_KEY: {
    BOG_DEPOSIT: 'BOG_DEPOSIT',
    BOG_WITHDRAW: 'BOG_WITHDRAW',
    TBC_DEPOSIT: 'TBC_DEPOSIT',
    TBC_WITHDRAW: 'TBC_WITHDRAW',
    ANY_DEPOSIT: 'ANY_DEPOSIT',
    ANY_WITHDRAW: 'ANY_WITHDRAW'
  },

  BY_ID: {
    85: 'BOG_DEPOSIT',
    86: 'BOG_WITHDRAW',
    65: 'TBC_DEPOSIT',
    66: 'TBC_WITHDRAW'
  }
};

export interface BankProvider {
  key: string;
  logo: string;
  minAmount: number;
  maxTotalAmountOnAttempts: number;
}

export interface BankProvidersData {
  active: boolean;
  currencies: ['GEL'];
  isDeposit: true;
  limits: {
    transferNumberLimitAttempts: number;
    fee: number;
    minAmount: number;
    maxTotalAmountOnAttempts: number;
  };
  providerId: number;
  providerName: string;
  settings: {
    visible: boolean;
  };
}

export type PaymentStep = 'internalForm' | 'externalForm';

export interface PaymentRequestObj {
  providerId: number;
  transactionAmount: number;
  transactionCurrency: string;
  callbackUrl: string;
  card: {
    activeCard?: boolean;
    creditCardId?: number;
  };
  accountId?: number;
}

export interface PaymentProviderResponse {
  transactionId?: number;
  responseCode?: number;
  responseText?: string;
  remoteTransactionId?: string;
  providerId: number;
  transactionAmount: number;
  remoteTransactionAmount: number;
  transactionCurrency: string;
  remoteTransactionCurrency: string;
  isBettingShopTransaction: boolean;
  isOnlineShopTransaction: boolean;
  isAgentConsoleTransaction: boolean;
  isAreaManagerTransaction: boolean;
  externalRequestUrl?: string;
  externalRequestForm?: string;
  success: boolean;
  manuallyFinished: boolean;
  balanceTypeId: string;
  unknownProperties?: any;
}
