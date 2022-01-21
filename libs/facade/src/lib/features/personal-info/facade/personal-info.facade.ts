import { Injectable } from '@angular/core';
import { PersonalInfoService } from '../services/personal-info.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SecurityOptions } from '../entity/security-options';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class PersonalInfoFacade {
  security$ = this.personalInfoService.getSubscriptionsFromServer();
  constructor(private readonly personalInfoService: PersonalInfoService) {}

  updateSubscriptions(options: SecurityOptions) {
    return this.personalInfoService
      .updateSubscriptionsOnServer(options)
      .pipe(untilDestroyed(this))
      .subscribe();
  }
}
