import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { tap } from 'rxjs/operators';
import { EgtJackpot } from '../entity/odometer.interface';

@Injectable({ providedIn: 'root' })
export class JackpotService {
  public readonly JACKPOT_DIGIT_COUNT = 9;
  private readonly URL =
    'https://api.crocobet.com/rest/integrations/ig/egtgames/jackpot/Crocobet_GEL';
  private readonly EQ_URL =
    'https://api.crocobet.com/rest/integrations/ig/egtgames/jackpot/Crocobet_EQ_GEL';

  private $jackpotData: Subject<EgtJackpot> = new Subject();

  private jackpotData$: Observable<EgtJackpot> =
    this.$jackpotData.asObservable();

  constructor(private http: HttpClient) {}

  fetchJackpot(): Observable<EgtJackpot> {
    return this.http.get<EgtJackpot>(this.URL).pipe(
      tap((jackpot) => {
        this.$jackpotData.next(jackpot);
      })
    );
  }

  getJackpot(): Observable<EgtJackpot> {
    return this.jackpotData$;
  }

  getEqJackpot() {
    return this.http.get(this.EQ_URL);
  }
}

// (jackpotData: EgtJackpot) => {
//   this.data.next(jackpotData);
// }
