import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { DepositPopupContainerComponent } from './deposit-popup-container.component';

describe('DepositPopupContainerComponent', () => {
  let spectator: Spectator<DepositPopupContainerComponent>;
  const createComponent = createComponentFactory(
    DepositPopupContainerComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
