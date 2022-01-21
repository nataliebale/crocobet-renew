import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  EgtJackpot,
  EgtOdometerConfig,
  JackpotFacade,
  OdometerData
} from '@crc/facade';
import { map } from 'rxjs/operators';

@Component({
  selector: 'crc-jackpot-odometer-container',
  templateUrl: './jackpot-odometer-container.component.html',
  styleUrls: ['./jackpot-odometer-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JackpotOdometerContainerComponent implements OnInit {
  readonly EGT_ODOMETER_COUNT = 4;
  odometerData: Array<OdometerData> = [];
  jackpot: EgtJackpot;
  odometers: EgtOdometerConfig[] = this.jackpotFacade.EGT_ODOMETER_CONFIG;
  odometerData$: any;
  private readonly ODOMETER_REFRESH_RATE: Array<number> = [
    15000, 15000, 15000, 15000, 20000, 30000, 50000, 80000
  ];
  private readonly LEVEL_ONE_OFFSET = 206;
  private readonly LEVEL_TWO_OFFSET = 180;
  private readonly LEVEL_THREE_OFFSET = 170;
  private readonly LEVEL_FOUR_OFFSET = 140;
  private odometerRefreshRateIndex = 0;

  constructor(private readonly jackpotFacade: JackpotFacade) {}

  ngOnInit(): void {
    this.subscribeToJackpot();
  }

  formatMoney(cents: number): string {
    return '' + cents / 100;
  }

  refreshOdometer(): void {
    this.jackpotFacade.updateJackpot().subscribe();
    this.odometerRefreshRateIndex = Math.min(
      this.ODOMETER_REFRESH_RATE.length - 1,
      this.odometerRefreshRateIndex + 1
    );
  }

  private subscribeToJackpot(): void {
    this.jackpotFacade.updateJackpot().subscribe();

    this.odometerData$ = this.jackpotFacade.getJackpot().pipe(
      map((jackpot) => {
        this.jackpot = jackpot;

        const dataRefreshRate: number =
          this.ODOMETER_REFRESH_RATE[this.odometerRefreshRateIndex];

        const initialStartNumberLevelI: number = Math.max(
          jackpot.currentLevelI - this.LEVEL_ONE_OFFSET,
          0
        );
        const startNumberLevelI: number = this.odometerData[0]
          ? this.odometerData[0].endNumber
          : initialStartNumberLevelI;
        const endNumberLevelI: number = jackpot.currentLevelI;
        const digitCountLevelI = 10;

        const odometerDataLevelI: OdometerData = {
          dataRefreshRate,
          digitCount: digitCountLevelI,
          startNumber: startNumberLevelI,
          endNumber: endNumberLevelI
        };

        const initialStartNumberLevelII: number = Math.max(
          jackpot.currentLevelII - this.LEVEL_TWO_OFFSET,
          0
        );
        const startNumberLevelII: number = this.odometerData[1]
          ? this.odometerData[1].endNumber
          : initialStartNumberLevelII;
        const endNumberLevelII: number = jackpot.currentLevelII;
        const digitCountLevelII = 10;

        const odometerDataLevelII: OdometerData = {
          dataRefreshRate,
          digitCount: digitCountLevelII,
          startNumber: startNumberLevelII,
          endNumber: endNumberLevelII
        };

        const initialStartNumberLevelIII: number = Math.max(
          jackpot.currentLevelIII - this.LEVEL_THREE_OFFSET,
          0
        );
        const startNumberLevelIII: number = this.odometerData[2]
          ? this.odometerData[2].endNumber
          : initialStartNumberLevelIII;
        const endNumberLevelIII: number = jackpot.currentLevelIII;
        const digitCountLevelIII = 10;

        const odometerDataLevelIII: OdometerData = {
          dataRefreshRate,
          digitCount: digitCountLevelIII,
          startNumber: startNumberLevelIII,
          endNumber: endNumberLevelIII
        };

        const initialStartNumberLevelIV: number = Math.max(
          jackpot.currentLevelIV - this.LEVEL_FOUR_OFFSET,
          0
        );
        const startNumberLevelIV: number = this.odometerData[3]
          ? this.odometerData[3].endNumber
          : initialStartNumberLevelIV;
        const endNumberLevelIV: number = jackpot.currentLevelIV;
        const digitCountLevelIIII = 10;

        const odometerDataLevelIV: OdometerData = {
          dataRefreshRate,
          digitCount: digitCountLevelIIII,
          startNumber: startNumberLevelIV,
          endNumber: endNumberLevelIV
        };

        const newOdometerData: Array<OdometerData> = [];
        newOdometerData.push(odometerDataLevelI);
        newOdometerData.push(odometerDataLevelII);
        newOdometerData.push(odometerDataLevelIII);
        newOdometerData.push(odometerDataLevelIV);
        return newOdometerData;
      })
    );
  }
}
