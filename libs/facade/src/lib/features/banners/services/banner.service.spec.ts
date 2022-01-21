import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { BannerService } from './banner.service';

describe('MainBannerService', () => {
  let spectator: SpectatorService<BannerService>;
  const createService = createServiceFactory(BannerService);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
