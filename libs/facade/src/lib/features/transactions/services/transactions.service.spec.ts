import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { TransactionsService } from './transactions.service';

describe('TopMatchesService', () => {
  let spectator: SpectatorService<TransactionsService>;
  const createService = createServiceFactory(TransactionsService);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
