import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { JackpotService } from './jackpot.service';

describe('JackpotService', () => {
  let spectator: SpectatorService<JackpotService>;
  const createService = createServiceFactory(JackpotService);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
