import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { PromotionsBannersPresentationComponent } from './promotions-banners-presentation.component';

describe('PromotionsPresentationComponent', () => {
  let spectator: Spectator<PromotionsBannersPresentationComponent>;
  const createComponent = createComponentFactory(
    PromotionsBannersPresentationComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
