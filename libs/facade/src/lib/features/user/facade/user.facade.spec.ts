import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { UserFacade } from './user.facade';

describe('UserFacade', () => {
  let spectator: SpectatorService<UserFacade>;
  const createService = createServiceFactory(UserFacade);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
