import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { DepositAmountContainerComponent } from './deposit-amount-container.component';

describe('DepositAmountContainerComponent', () => {
  let spectator: Spectator<DepositAmountContainerComponent>;
  const createComponent = createComponentFactory(
    DepositAmountContainerComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
