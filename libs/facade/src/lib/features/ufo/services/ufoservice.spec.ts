import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { UfoService } from './ufo.service';

describe('UfoService', () => {
  let spectator: SpectatorService<UfoService>;
  const createService = createServiceFactory(UfoService);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
