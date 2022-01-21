import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { JackpotOdometerPresentationComponent } from './jackpot-odometer-presentation.component';

describe('JackpotOdometerPresentationComponent', () => {
  let spectator: Spectator<JackpotOdometerPresentationComponent>;
  const createComponent = createComponentFactory(
    JackpotOdometerPresentationComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
