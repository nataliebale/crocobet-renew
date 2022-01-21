import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

import { AccountFacade, AuthFacade } from '@crc/facade';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'crc-header-container',
  templateUrl: './header-container.component.html',
  styleUrls: ['./header-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderContainerComponent {
  isLoggedIn$: Observable<boolean> = this.authFacade.isLoggedIn$();
  personalData$ = this.accountFacade.personalData$;

  constructor(
    private readonly authFacade: AuthFacade,
    private readonly accountFacade: AccountFacade
  ) {}
}
