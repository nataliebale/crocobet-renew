import { VerificationNavItem } from '../entity/verification-nav-item.interface';
import { generateVerificationNavItems } from '../functions/functions';

export const VERIFICATION_NAV: VerificationNavItem[] = [
  generateVerificationNavItems('live', 'live-verification-text'),
  generateVerificationNavItems('selfie', 'selfie-verification-text'),
  generateVerificationNavItems('chat', 'chat-verification-text')
];
