import { HeaderPromotionsPresentationComponent } from './header-promotions-presentation.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('HeaderPromotionsPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: HeaderPromotionsPresentationComponent,
    shallow: true,
    detectChanges: false
  });

  it('should create the HeaderPromotionsPresentationComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
