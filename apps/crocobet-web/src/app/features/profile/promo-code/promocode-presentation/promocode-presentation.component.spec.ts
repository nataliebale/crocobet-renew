import { createComponentFactory } from '@ngneat/spectator';
import { PromocodePresentationComponent } from './promocode-presentation.component';

describe('PromocodePresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: PromocodePresentationComponent,
    shallow: true
  });

  it('should create the PromocodePresentationComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
