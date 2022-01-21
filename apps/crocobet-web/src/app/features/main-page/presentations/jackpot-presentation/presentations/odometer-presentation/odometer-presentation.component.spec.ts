import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { OdometerPresentationComponent } from './odometer-presentation.component';

describe('OdometerPresentationComponent', () => {
  let spectator: Spectator<OdometerPresentationComponent>;
  const createComponent = createComponentFactory(OdometerPresentationComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
