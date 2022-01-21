import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'crc-ufo-presentation',
  templateUrl: './ufo-presentation.component.html',
  styleUrls: ['./ufo-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UfoPresentationComponent {
  @Input() ufoGameLink: string;
}
