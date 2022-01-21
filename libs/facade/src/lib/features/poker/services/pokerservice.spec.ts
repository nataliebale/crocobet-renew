import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { PokerService } from './poker.service';

describe('PokerService', () => {
  let spectator: SpectatorService<PokerService>;
  const createService = createServiceFactory(PokerService);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
