import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// TODO refactor
@Injectable({ providedIn: 'root' })
export class DictionaryDataService {
  private readonly dataLoaded$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  setDataLoaded(status: boolean) {
    this.dataLoaded$.next(status);
  }

  getDataLoaded$(): Observable<boolean> {
    return this.dataLoaded$.asObservable();
  }
}
