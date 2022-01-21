import { Injectable } from '@angular/core';
import { VerificationNavItem } from '../entity/verification-nav-item.interface';
import { VERIFICATION_NAV } from '../constants/verification-nav.constant';

@Injectable({ providedIn: 'root' })
export class VerificationFacade {
  private readonly verificationNav: VerificationNavItem[] = VERIFICATION_NAV;

  getVerificationNav(): VerificationNavItem[] {
    return this.verificationNav;
  }
}
