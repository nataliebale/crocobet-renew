import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SlotsMainRouteContainerComponent } from './slots-main-route-container.component';

describe('SlotsBannerPresentationComponent', () => {
  let spectator: Spectator<SlotsMainRouteContainerComponent>;
  const createComponent = createComponentFactory(
    SlotsMainRouteContainerComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
