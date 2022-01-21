import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { PokerService } from '../services/poker.service';

@Injectable({
  providedIn: 'root'
})
export class PokerFacade {
  constructor(private readonly pokerService: PokerService) {}

  getPokerLink(): Observable<string> {
    return this.pokerService.getPokerLink();
  }

  getLaunchUrl(url: string): string {
    return encodeURIComponent(url);
  }
}
