import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { DepositFacade } from './deposit.facade';

describe('DepositFacade', () => {
  let spectator: SpectatorService<DepositFacade>;
  const createService = createServiceFactory(DepositFacade);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
