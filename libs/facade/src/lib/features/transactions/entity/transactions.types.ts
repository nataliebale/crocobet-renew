export const TransactionsStatus = {
  statuses: {
    INI: 'transaction_status_Pending',
    FLD: 'transaction_status_Failed',
    SCS: 'transaction_status_Success',
    DEC: 'transaction_status_Declined',
    ERR: 'transaction_status_Error',
    IPR: 'transaction_status_progress'
  },
  classes: {
    INI: 'pending',
    FLD: 'failed',
    SCS: 'success',
    DEC: 'declined',
    ERR: 'error',
    IPR: 'in-progress'
  }
};

export const TransactionCurrencies = {
  currencies: {
    GEL: '₾',
    USD: '$',
    EUR: '€'
  }
};
