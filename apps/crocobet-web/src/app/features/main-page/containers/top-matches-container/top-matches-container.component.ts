import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { TopMatchesFacade, SportMatches } from '@crc/facade';

@Component({
  selector: 'crc-top-matches-container',
  templateUrl: './top-matches-container.component.html',
  styleUrls: ['./top-matches-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopMatchesContainerComponent {
  firstName: string;
  secondName: string;
  $topMatchEvents: Observable<SportMatches[]>;

  constructor(private topMatchesFacade: TopMatchesFacade) {
    this.$topMatchEvents = this.topMatchesFacade.topMatchEvents$;
  }
}
