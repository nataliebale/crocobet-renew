import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { JackpotService } from '../services/jackpot.service';
import { EgtOdometerConfigs } from '../entity/egt-odometer-config';
import { EgtJackpot, EgtOdometerConfig } from '../entity/odometer.interface';

@Injectable({
  providedIn: 'root'
})
export class JackpotFacade {
  EGT_ODOMETER_CONFIG: EgtOdometerConfig[] = EgtOdometerConfigs;

  constructor(private readonly jackpotService: JackpotService) {}

  getJackpot(): Observable<EgtJackpot> {
    return this.jackpotService.getJackpot();
  }

  updateJackpot(): Observable<EgtJackpot> {
    return this.jackpotService.fetchJackpot();
  }
}
