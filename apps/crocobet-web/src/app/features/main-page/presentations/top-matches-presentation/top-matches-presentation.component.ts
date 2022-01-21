import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { SportMatches, SportMatchView } from '@crc/facade';

@Component({
  selector: 'crc-top-matches-presentation',
  templateUrl: './top-matches-presentation.component.html',
  styleUrls: ['./top-matches-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopMatchesPresentationComponent {
  viewtopMatches: SportMatchView[];
  @Input() set topMatches(tomatches: SportMatches[]) {
    this.viewtopMatches = tomatches?.map((tp) => {
      return {
        ...tp,
        firstOutcomeOdd: this.getOutcome(tp, '1'),
        secondOutcomeOdd: this.getOutcome(tp, 'X'),
        thirdOutcomeOdd: this.getOutcome(tp, '2')
      };
    });
  }

  getOutcome(topMatch: SportMatches, find: string) {
    return topMatch.eventGames[0].outcomes.filter(
      (o) => o.outcomeName === find
    )[0];
  }
}
