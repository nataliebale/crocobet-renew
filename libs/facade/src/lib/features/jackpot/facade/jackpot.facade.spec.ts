import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { JackpotFacade } from './jackpot.facade';

describe('JackpotFacade', () => {
  let spectator: SpectatorService<JackpotFacade>;
  const createService = createServiceFactory(JackpotFacade);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
