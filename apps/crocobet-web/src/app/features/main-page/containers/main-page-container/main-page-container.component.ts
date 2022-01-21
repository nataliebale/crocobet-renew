import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'crc-main-page-container',
  templateUrl: './main-page-container.component.html',
  styleUrls: ['./main-page-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageContainerComponent {}
