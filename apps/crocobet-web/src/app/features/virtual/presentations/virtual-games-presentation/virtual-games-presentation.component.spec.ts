import { VirtualGamesPresentationComponent } from './virtual-games-presentation.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('VirtualGamesPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: VirtualGamesPresentationComponent,
    shallow: true
  });

  it('should create the VirtualGamesPresentationComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
