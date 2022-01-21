import { generateDepositOtherPayments } from '../functions/functions';
import { DepositOtherPayment } from '../entity/deposit-other-payments.interface';

export const DEPOSIT_OTHER_PAYMENTS: DepositOtherPayment[] = [
  generateDepositOtherPayments(
    'TBCPAY.GE',
    '/assets/icons/cards/tbc-pay.svg',
    'https://tbcpay.ge/services/totalizatorebi-kazino-lataria/crocobet'
  ),
  /*  generateDepositOtherPayments(
    'EPAY.GE',
    '/assets/icons/cards/e-pay.png',
    'https://www.epay.ge/'
  ),*/
  generateDepositOtherPayments(
    'OPPA.GE',
    '/assets/icons/cards/oppa-pay.svg',
    'https://www.oppa.ge/ka#!totalizatori/crocobet_com'
  ),
  generateDepositOtherPayments(
    'PAY.GE',
    '/assets/icons/cards/pay.png',
    'https://pay.ge/krokobetibalansis-sevseba'
  ),
  generateDepositOtherPayments(
    'EMONEY',
    '/assets/icons/cards/e-money.png',
    'https://www.emoney.ge/index.php/main/service?id=1596'
  ),
  generateDepositOtherPayments('სალაროები', '/assets/icons/cards/pin.svg', '')
];
