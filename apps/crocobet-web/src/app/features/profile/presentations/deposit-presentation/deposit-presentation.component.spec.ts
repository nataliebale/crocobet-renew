import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { DepositPresentationComponent } from './deposit-presentation.component';

describe('DepositPresentationComponent', () => {
  let spectator: Spectator<DepositPresentationComponent>;
  const createComponent = createComponentFactory(DepositPresentationComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
