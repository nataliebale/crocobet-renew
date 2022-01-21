import { HeaderPromotionsContainerComponent } from './header-promotions-container.component';
import { createComponentFactory } from '@ngneat/spectator';
import { mockProvider } from '@ngneat/spectator/jest';
import { PromotionFacade } from '@crc/facade';

describe('HeaderPromotionsContainerComponent', () => {
  const createComponent = createComponentFactory({
    component: HeaderPromotionsContainerComponent,
    shallow: true,
    providers: [mockProvider(PromotionFacade)]
  });

  it('should create the HeaderPromotionsContainerComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
