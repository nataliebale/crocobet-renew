import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { LoginInPopupContainerComponent } from './login-in-popup-container.component';

describe('LoginInPopupContainerComponent', () => {
  let spectator: Spectator<LoginInPopupContainerComponent>;
  const createComponent = createComponentFactory(LoginInPopupContainerComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
