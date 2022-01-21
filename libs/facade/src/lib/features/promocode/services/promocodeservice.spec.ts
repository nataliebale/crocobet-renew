import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { PromocodeService } from './promocode.service';

describe('PromocodeService', () => {
  let spectator: SpectatorService<PromocodeService>;
  const createService = createServiceFactory(PromocodeService);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
