import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { DepositPopupPresentationComponent } from './deposit-popup-presentation.component';

describe('DepositPopupPresentationComponent', () => {
  let spectator: Spectator<DepositPopupPresentationComponent>;
  const createComponent = createComponentFactory(
    DepositPopupPresentationComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
