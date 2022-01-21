import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { VirtualService } from './virtual.service';

describe('VirtualService', () => {
  let spectator: SpectatorService<VirtualService>;
  const createService = createServiceFactory(VirtualService);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
