import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OutcomeView } from '@crc/facade';

@Component({
  selector: 'crc-w-top-match-odd-presentation',
  templateUrl: './top-match-odd-presentation.component.html',
  styleUrls: ['./top-match-odd-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopMatchOddPresentationComponent {
  @Input() outcome: OutcomeView;
}
