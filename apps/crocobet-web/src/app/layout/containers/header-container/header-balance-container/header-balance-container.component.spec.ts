import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { HeaderBalanceContainerComponent } from './header-balance-container.component';

describe('HeaderBalanceContainerComponent', () => {
  let spectator: Spectator<HeaderBalanceContainerComponent>;
  const createComponent = createComponentFactory(
    HeaderBalanceContainerComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
