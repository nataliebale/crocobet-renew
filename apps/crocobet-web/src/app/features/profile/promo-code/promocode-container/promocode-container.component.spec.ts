import { createComponentFactory } from '@ngneat/spectator';
import { PromocodeContainerComponent } from './promocode-container.component';

describe('PromocodeContainerComponent', () => {
  const createComponent = createComponentFactory({
    component: PromocodeContainerComponent,
    shallow: true
  });

  it('should create the PromocodeContainerComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
