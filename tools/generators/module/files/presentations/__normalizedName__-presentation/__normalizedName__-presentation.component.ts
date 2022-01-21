import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'crc-<%= feature.fileName %>-presentation',
  templateUrl: './<%= feature.fileName %>-presentation.component.html',
  styleUrls: ['./<%= feature.fileName %>-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%= feature.className %>PresentationComponent {}
