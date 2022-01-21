import { ChangeDetectionStrategy, Component } from '@angular/core';
import { delay, Observable, switchMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';

import { SecretCardFacade, UserPPDataWithHash } from '@crc/facade';
import { LanguageFacade } from '@crc/shared';

@Component({
  selector: 'crc-secret-card-container',
  templateUrl: './secret-card-container.component.html',
  styleUrls: ['./secret-card-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecretCardContainerComponent {
  iframeUrl: Observable<string>;
  loading = false;

  constructor(
    private readonly facade: SecretCardFacade,
    private readonly languageFacade: LanguageFacade
  ) {
    this.iframeUrl = this.languageFacade.current$.pipe(
      tap((_) => (this.loading = true)),
      switchMap((lang) => this.facade.getCustomerDataHash()),
      map((data) => this.generateUrl(data)),
      delay(500),
      tap((_) => (this.loading = false))
    );
  }

  private generateUrl(data: UserPPDataWithHash): string {
    return `https://mm.ge/crocobetcard.php?lang=${this.languageFacade.getLangReturnGeIfKa()}&personal_number=${
      data.personalNumber
    }&pin_code=${data.pinCode}&hash=${data.hash}`;
  }
}
