import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { EgtJackpot, EgtOdometerConfig } from '@crc/facade';

export type jackpot = 'largestWinDate';

@Component({
  selector: 'crc-jackpot-odometer-presentation',
  templateUrl: './jackpot-odometer-presentation.component.html',
  styleUrls: ['./jackpot-odometer-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JackpotOdometerPresentationComponent {
  @Input() odometerData: any;
  @Input() odometerCount: number;
  @Input() odometers: EgtOdometerConfig[];
  @Input() jackpot: EgtJackpot;

  @Output() refreshOdometer: EventEmitter<string> = new EventEmitter();

  emitRefreshOdometer() {
    this.refreshOdometer.emit();
  }

  public formatMoney(cents: number): string {
    return '' + cents / 100;
  }

  getJackpotProperties(
    jackpot: any,
    level: string,
    objectProperty: string
  ): string | number {
    const temp = `${objectProperty}${level}`;
    return jackpot[temp];
  }
}
