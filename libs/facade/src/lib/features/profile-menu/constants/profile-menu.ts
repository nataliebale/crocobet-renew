import { generateProfileMenuItems } from '../functions/functions';
import { ProfileMenuItem } from '../entity/profile-menu.interface';

export const PROFILE_MENU_ITEMS: ProfileMenuItem[] = [
  generateProfileMenuItems(
    'deposit',
    'user_profile_deposit',
    'assets/icons/profile/plus.svg'
  ),
  generateProfileMenuItems(
    'navbar.live',
    'common_withdraw_next',
    'assets/icons/profile/minus.svg'
  ),
  generateProfileMenuItems(
    'transactions-history',
    'userPanel_wallet',
    'assets/icons/profile/transactions.svg'
  ),
  generateProfileMenuItems(
    'promocode',
    'user_profile_promocode',
    'assets/icons/profile/promocode.svg'
  ),
  generateProfileMenuItems(
    'personal-info',
    'user_profile_title',
    'assets/icons/profile/profile.svg'
  ),
  generateProfileMenuItems(
    '/profile/verification',
    'verification_pending_fourthStep',
    'assets/icons/profile/verification.svg'
  ),
  generateProfileMenuItems(
    '/profile/secret-card',
    'secret_card',
    'assets/icons/profile/secretcard.svg'
  ),
  generateProfileMenuItems(
    '/profile/cashiers',
    'userPanel_cashDesk',
    'assets/icons/profile/cashdesks.svg'
  )
];
