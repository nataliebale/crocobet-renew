import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { DepositContainerComponent } from './deposit-container.component';

describe('DepositContainerComponent', () => {
  let spectator: Spectator<DepositContainerComponent>;
  const createComponent = createComponentFactory(DepositContainerComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
