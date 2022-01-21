import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { VirtualFacade } from './virtual.facade.ts';

describe('VirtualFacade', () => {
  let spectator: SpectatorService<VirtualFacade>;
  const createService = createServiceFactory(VirtualFacade);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
