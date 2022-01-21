import { FiltersComponent } from './filters.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('SwiperComponent', () => {
  const createComponent = createComponentFactory({
    component: FiltersComponent,
    shallow: true
  });

  it('should create the FiltersComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
