import { Injectable } from '@angular/core';
import { BaseUrl, HttpService } from '@crc/shared';
import { Observable } from 'rxjs';
import { Tournament } from '../entity/games.interface';
import { map } from 'rxjs/operators';
import { GameType } from '../entity/p2p-game.types';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  constructor(private readonly apiService: HttpService) {}

  getGameLink(
    provider: string,
    customerId: number,
    gameId?: number
  ): Observable<string> {
    const path = `/rest/integrations/ig/${provider}/get_game?customerid=${customerId}&gameid=${gameId}`;
    const baseUrl: BaseUrl = 'apiUrl';
    return this.apiService.get$<string>({
      path,
      baseUrl,
      responseType: 'text'
    });
  }

  getGameTournaments(gameType: GameType): Observable<Tournament[]> {
    const path = `/tournaments?gameType=${gameType}`;
    const baseUrl: BaseUrl = 'cmsApiUrl';
    return this.apiService
      .get$<{ data: Tournament[] }>({ path, baseUrl })
      .pipe(map((result) => result.data));
  }
}
