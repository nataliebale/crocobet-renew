import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { PersonalInfoService } from './personal-info.service';

describe('PersonalInfoService', () => {
  let spectator: SpectatorService<PersonalInfoService>;
  const createService = createServiceFactory(PersonalInfoService);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
