import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { CasinoPlayRouteContainerComponent } from './casino-play-route-container.component';

describe('CasinosPlayRouteContainerComponent', () => {
  let spectator: Spectator<CasinoPlayRouteContainerComponent>;
  const createComponent = createComponentFactory(
    CasinoPlayRouteContainerComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
