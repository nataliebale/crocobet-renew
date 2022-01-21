import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { DepositPayPresentationComponent } from './deposit-pay-presentation.component';

describe('DepositPayPresentationComponent', () => {
  let spectator: Spectator<DepositPayPresentationComponent>;
  const createComponent = createComponentFactory(
    DepositPayPresentationComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
