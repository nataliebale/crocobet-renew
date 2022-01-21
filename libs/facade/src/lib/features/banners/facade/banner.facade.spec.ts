import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { BannerFacade } from './banner.facade';

describe('MainBannerFacade', () => {
  let spectator: SpectatorService<BannerFacade>;
  const createService = createServiceFactory(BannerFacade);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
