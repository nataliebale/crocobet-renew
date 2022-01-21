import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { HeaderDepositContainerComponent } from './header-deposit-container.component';

describe('HeaderDepositContainerComponent', () => {
  let spectator: Spectator<HeaderDepositContainerComponent>;
  const createComponent = createComponentFactory(
    HeaderDepositContainerComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
