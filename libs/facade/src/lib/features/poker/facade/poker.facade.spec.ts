import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { PokerFacade } from './poker.facade.ts';

describe('PokerFacade', () => {
  let spectator: SpectatorService<PokerFacade>;
  const createService = createServiceFactory(PokerFacade);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
