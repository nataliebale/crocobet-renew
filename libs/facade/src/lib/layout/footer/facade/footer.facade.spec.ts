import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { FooterFacade } from './footer.facade';

describe('FooterFacade', () => {
  let spectator: SpectatorService<FooterFacade>;
  const createService = createServiceFactory(FooterFacade);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
