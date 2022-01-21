import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { UfoFacade } from './ufo.facade.ts';

describe('UfoFacade', () => {
  let spectator: SpectatorService<UfoFacade>;
  const createService = createServiceFactory(UfoFacade);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
