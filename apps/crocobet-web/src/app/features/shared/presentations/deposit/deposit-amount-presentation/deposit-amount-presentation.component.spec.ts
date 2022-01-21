import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { DepositAmountPresentationComponent } from './deposit-amount-presentation.component';

describe('DepositAmountPresentationComponent', () => {
  let spectator: Spectator<DepositAmountPresentationComponent>;
  const createComponent = createComponentFactory(
    DepositAmountPresentationComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
