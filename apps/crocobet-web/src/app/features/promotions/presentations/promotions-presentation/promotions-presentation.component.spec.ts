import { createComponentFactory } from '@ngneat/spectator';
import { PromotionsPresentationComponent } from './promotions-presentation.component';

describe('PromotionsPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: PromotionsPresentationComponent,
    shallow: true
  });

  it('should create the PromotionsPresentationComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
