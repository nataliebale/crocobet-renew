import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import {<%= feature.className %>Service} from './<%= feature.fileName %>.service';

describe('<%= feature.className %>Service', () => {
  let spectator: SpectatorService<<%= feature.className %>Service>;
  const createService = createServiceFactory(<%= feature.className %>Service);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
