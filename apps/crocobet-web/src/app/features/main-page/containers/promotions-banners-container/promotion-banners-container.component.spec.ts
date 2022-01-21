import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { PromotionBannersContainerComponent } from './promotion-banners-container.component';

describe('PromotionsContainerComponent', () => {
  let spectator: Spectator<PromotionBannersContainerComponent>;
  const createComponent = createComponentFactory(
    PromotionBannersContainerComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
