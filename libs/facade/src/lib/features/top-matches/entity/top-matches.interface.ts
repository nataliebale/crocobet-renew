import { LiveInfo } from './live-info.model';
import { LiveParticipants } from './live-participants.model';
import { OddChange } from './odd-change.model';

export interface SportEventData {
  data: SportMatches[];
}

export interface SportMatches {
  category1Id: number;
  category1Name: string;
  category2Id: number;
  category2Name: string;
  category3Id: number;
  category3Name: string;
  eventCodeId: number;
  eventGames: Array<EventGame>;
  eventId: number;
  eventName: string;
  eventStart: number;
  eventType: number;
  gamesCount: number;
  remoteId: number;
  treatAsSport: number;

  // ----
  categorySortOrder?: number;
  counter?: number;
  firstTeamName?: string;
  secondTeamName?: string;
  infos?: Array<LiveInfo>;
  partialScores?: string;
  participants?: Array<LiveParticipants>;
  periodTimeLeft?: string;
  remoteStatus?: number;
  result?: string;
  score?: string;
  servingTeam?: number;
  sportSortOrder?: number;
  time?: number;
  oddChange?: OddChange;
  isScoreChanged?: boolean;
  hasStreamId?: boolean;

  // -- !?
  isFromHistory?: boolean;
  finished?: boolean;
}

export interface EventGame {
  argument: number;
  combinationType: number;
  combinationTypes: Array<number>;
  eventLayout: number;
  gameCode: number;
  gameId: number;
  gameLayout: number;
  gameName: string;
  gameType: number;
  marketTypes: Array<number>;
  outcomes: Array<Outcome | LiveOutcome>;
  periodId: number;

  categoryBuilder?: number;
  eventBuilder?: number;
  gameCodeId?: number;
  mainGame?: boolean;
  marketType?: number;
  sortOrder?: number;
  status?: number;
  gameTypePattern?: string | undefined;
}

export interface Outcome {
  outcomeId: number;
  outcomeName: string;
  outcomeOdds: number;
  oddChange?: number;
}

export class LiveOutcome {
  outcomeId?: number;
  outcomeName?: string;
  outcomeOdds?: number;
  status?: number;
  oddChange?: OddChange;
}

export type SportMatchView = SportMatches & {
  firstOutcomeOdd: OutcomeView;
  secondOutcomeOdd: OutcomeView;
  thirdOutcomeOdd: OutcomeView;
};

export type OutcomeView = Outcome | LiveOutcome;
