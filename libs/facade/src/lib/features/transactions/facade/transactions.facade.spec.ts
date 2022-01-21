import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { TransactionsFacade } from './transactions.facade';

describe('TransactionsFacade', () => {
  let spectator: SpectatorService<TransactionsFacade>;
  const createService = createServiceFactory(TransactionsFacade);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
