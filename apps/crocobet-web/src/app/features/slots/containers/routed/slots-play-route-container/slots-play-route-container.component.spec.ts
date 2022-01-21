import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SlotsPlayRouteContainerComponent } from './slots-play-route-container.component';

describe('SlotsPlayRouteContainerComponent', () => {
  let spectator: Spectator<SlotsPlayRouteContainerComponent>;
  const createComponent = createComponentFactory(
    SlotsPlayRouteContainerComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
