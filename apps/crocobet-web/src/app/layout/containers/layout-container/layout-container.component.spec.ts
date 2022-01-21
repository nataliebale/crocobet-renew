import { LayoutContainerComponent } from './layout-container.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('LayoutContainerComponent', () => {
  const createComponent = createComponentFactory({
    component: LayoutContainerComponent,
    shallow: true
  });

  it('should create', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
