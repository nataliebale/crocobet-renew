import { createComponentFactory } from '@ngneat/spectator';
import { PromotionsContainerComponent } from './promotions-container.component';
import { PromotionsFacade } from '@crc/facade';
import { mockProvider } from '@ngneat/spectator/jest';

describe('PromotionsContainerComponent', () => {
  const createComponent = createComponentFactory({
    component: PromotionsContainerComponent,
    shallow: true,
    providers: [mockProvider(PromotionsFacade)]
  });

  it('should create the PromotionsContainerComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
