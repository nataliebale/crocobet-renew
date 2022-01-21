import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { DepositPayContainerComponent } from './deposit-pay-container.component';

describe('DepositPayContainerComponent', () => {
  let spectator: Spectator<DepositPayContainerComponent>;
  const createComponent = createComponentFactory(DepositPayContainerComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
