import { createComponentFactory } from '@ngneat/spectator';
import { HeaderContainerComponent } from './header-container.component';

describe('HeaderContainerComponent', () => {
  const createComponent = createComponentFactory({
    component: HeaderContainerComponent,
    shallow: true
  });

  it('should create the HeaderContainerComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
