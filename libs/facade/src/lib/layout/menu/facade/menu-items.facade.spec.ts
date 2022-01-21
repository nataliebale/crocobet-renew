import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { MenuItemsFacade } from './menu-items.facade';

describe('MenuItemsFacade', () => {
  let spectator: SpectatorService<MenuItemsFacade>;
  const createService = createServiceFactory(MenuItemsFacade);

  beforeEach(() => (spectator = createService()));

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
