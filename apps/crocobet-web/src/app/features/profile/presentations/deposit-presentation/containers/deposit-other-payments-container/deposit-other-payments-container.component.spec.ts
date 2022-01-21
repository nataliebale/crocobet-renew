import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { DepositOtherPaymentsContainerComponent } from './deposit-other-payments-container.component';

describe('DepositOtherPaymentsContainerComponent', () => {
  let spectator: Spectator<DepositOtherPaymentsContainerComponent>;
  const createComponent = createComponentFactory(
    DepositOtherPaymentsContainerComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
