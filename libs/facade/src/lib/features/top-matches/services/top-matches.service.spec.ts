import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { TopMatchesService } from './top-matches.service';

describe('TopMatchesService', () => {
  let spectator: SpectatorService<TopMatchesService>;
  const createService = createServiceFactory(TopMatchesService);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
