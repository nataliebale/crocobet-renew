import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { MenuItemsService } from './menu-items.service';

describe('MenuItemsService', () => {
  let spectator: SpectatorService<MenuItemsService>;
  const createService = createServiceFactory(MenuItemsService);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
