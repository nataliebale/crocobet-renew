import { VirtualContainerComponent } from './virtual-container.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('VirtualContainerComponent', () => {
  const createComponent = createComponentFactory({
    component: VirtualContainerComponent,
    shallow: true
  });

  it('should create the VirtualContainerComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
