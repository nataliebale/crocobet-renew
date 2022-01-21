import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { RegisterService } from './register.service';

describe('RegisterService', () => {
  let spectator: SpectatorService<RegisterService>;
  const createService = createServiceFactory(RegisterService);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
