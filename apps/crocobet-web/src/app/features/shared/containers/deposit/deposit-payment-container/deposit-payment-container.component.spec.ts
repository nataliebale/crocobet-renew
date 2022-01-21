import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { DepositPaymentContainerComponent } from './deposit-payment-container.component';

describe('DepositPaymentContainerComponent', () => {
  let spectator: Spectator<DepositPaymentContainerComponent>;
  const createComponent = createComponentFactory(
    DepositPaymentContainerComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
