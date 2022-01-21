import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { DepositService } from './deposit.service';

describe('DepositService', () => {
  let spectator: SpectatorService<DepositService>;
  const createService = createServiceFactory(DepositService);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
