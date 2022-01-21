import { PromotionsTimerPresentationComponent } from './promotions-timer-presentation.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('PromotionsTimerPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: PromotionsTimerPresentationComponent,
    shallow: true
  });

  it('should create the PromotionsTimerPresentationComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
