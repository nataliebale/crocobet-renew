import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { <%= feature.className %>Facade} from './<%= feature.fileName %>.facade.ts';

describe('<%= feature.className %>Facade', () => {
  let spectator: SpectatorService<<%= feature.className %>Facade>;
  const createService = createServiceFactory( <%= feature.className %>Facade);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
