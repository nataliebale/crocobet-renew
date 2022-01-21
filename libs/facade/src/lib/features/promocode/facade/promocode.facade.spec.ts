import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { PromocodeFacade } from './promocode.facade.ts';

describe('PromocodeFacade', () => {
  let spectator: SpectatorService<PromocodeFacade>;
  const createService = createServiceFactory(PromocodeFacade);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
