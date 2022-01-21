import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { JackpotOdometerContainerComponent } from './jackpot-odometer-container.component';

describe('JackpotOdometerContainerComponent', () => {
  let spectator: Spectator<JackpotOdometerContainerComponent>;
  const createComponent = createComponentFactory(
    JackpotOdometerContainerComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
