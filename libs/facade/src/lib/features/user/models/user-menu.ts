import { ListItem } from '../entity/list-item.interface';

export const UserMenuItems: ListItem[] = [
  {
    name: 'user_balance',
    value: 'balance',
    link: '/profile/deposit'
  },
  {
    name: 'user_transaction_history',
    value: 'transaction',
    link: '/profile/transactions-history'
  },
  {
    name: 'user_promocode',
    value: 'promocode',
    link: '/profile/promocode'
  },
  {
    name: 'user_profile',
    value: 'profile',
    link: '/profile/personal-info'
  },
  {
    name: 'user_secret_card',
    value: 'secret-card',
    link: '/profile/secret-card'
  },
  {
    name: 'user_cash_desk',
    value: 'cash-desk',
    link: '/profile/cashiers'
  },
  {
    name: 'user_log_out',
    value: 'log-out'
  }
];
