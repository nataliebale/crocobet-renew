import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SharedBannerContainerComponent } from './shared-banner-container.component';

describe('MainBannerContainerComponent', () => {
  let spectator: Spectator<SharedBannerContainerComponent>;
  const createComponent = createComponentFactory(
    SharedBannerContainerComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
