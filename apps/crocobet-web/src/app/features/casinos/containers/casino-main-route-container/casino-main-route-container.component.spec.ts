import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { CasinoMainRouteContainerComponent } from './casino-main-route-container.component';

describe('CasinosBannerPresentationComponent', () => {
  let spectator: Spectator<CasinoMainRouteContainerComponent>;
  const createComponent = createComponentFactory(
    CasinoMainRouteContainerComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
