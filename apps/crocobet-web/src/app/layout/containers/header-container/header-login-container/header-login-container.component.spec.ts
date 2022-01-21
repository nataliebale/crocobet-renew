import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { HeaderLoginContainerComponent } from './header-login-container.component';

describe('HeaderLoginContainerComponent', () => {
  let spectator: Spectator<HeaderLoginContainerComponent>;
  const createComponent = createComponentFactory(HeaderLoginContainerComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
