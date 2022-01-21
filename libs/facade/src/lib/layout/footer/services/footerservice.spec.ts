import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { FooterService } from './footer.service';

describe('FooterService', () => {
  let spectator: SpectatorService<FooterService>;
  const createService = createServiceFactory(FooterService);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
