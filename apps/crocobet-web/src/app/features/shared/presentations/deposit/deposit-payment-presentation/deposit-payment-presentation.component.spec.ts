import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { DepositPaymentPresentationComponent } from './deposit-payment-presentation.component';

describe('DepositPaymentPresentationComponent', () => {
  let spectator: Spectator<DepositPaymentPresentationComponent>;
  const createComponent = createComponentFactory(
    DepositPaymentPresentationComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
