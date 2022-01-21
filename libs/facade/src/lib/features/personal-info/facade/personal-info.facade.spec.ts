import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { PersonalInfoFacade } from './personal-info.facade';

describe('PersonalInfoFacade', () => {
  let spectator: SpectatorService<PersonalInfoFacade>;
  const createService = createServiceFactory(PersonalInfoFacade);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
