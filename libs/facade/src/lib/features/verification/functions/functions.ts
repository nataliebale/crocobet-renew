import { VerificationNavItem } from '../entity/verification-nav-item.interface';

export function generateVerificationNavItems(
  link: string,
  label: string
): VerificationNavItem {
  return { link, label };
}
