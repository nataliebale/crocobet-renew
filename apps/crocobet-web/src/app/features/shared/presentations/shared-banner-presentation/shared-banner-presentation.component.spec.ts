import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SharedBannerPresentationComponent } from './shared-banner-presentation.component';

describe('MainBannerPresentationComponent', () => {
  let spectator: Spectator<SharedBannerPresentationComponent>;
  const createComponent = createComponentFactory(
    SharedBannerPresentationComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
