import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weekly } from '../entity/games.interface';
import { GamesService } from '../services/games.service';
import {
  LanguageStorage,
  removeTimeZone,
  replaceLanguageKeyInString
} from '@crc/shared';
import { GameType } from '../entity/p2p-game.types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamesFacade {
  constructor(
    private readonly gamesService: GamesService,
    private readonly langStorage: LanguageStorage
  ) {}

  replaceLanguage(url: string): string {
    const test = this.langStorage.getLang();
    return replaceLanguageKeyInString(url, 'ka', test);
  }

  getGameLink(
    provider: string,
    customerId: number,
    gameId?: number
  ): Observable<string> {
    return this.gamesService.getGameLink(provider, customerId, gameId);
  }

  getTournament(gameType: GameType) {
    return this.gamesService.getGameTournaments(gameType).pipe(
      map((tournaments) =>
        tournaments.map((tournament) => {
          return {
            ...tournament,
            startDate: removeTimeZone(new Date(tournament.startDate))
          };
        })
      )
    );
  }

  getWeekly(gameWeeklyRatingItems: Weekly[]): Weekly[] {
    return gameWeeklyRatingItems.sort((a: any, b: any) => a.prize - b.prize);
  }
}
