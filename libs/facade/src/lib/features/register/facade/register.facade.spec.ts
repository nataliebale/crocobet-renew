import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { RegisterFacade } from './register.facade.ts';

describe('RegisterFacade', () => {
  let spectator: SpectatorService<RegisterFacade>;
  const createService = createServiceFactory(RegisterFacade);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
