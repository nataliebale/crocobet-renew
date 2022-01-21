import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { TopMatchesFacade } from './top-matches.facade';

describe('TopMatchesFacade', () => {
  let spectator: SpectatorService<TopMatchesFacade>;
  const createService = createServiceFactory(TopMatchesFacade);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
