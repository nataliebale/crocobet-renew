import { createComponentFactory } from '@ngneat/spectator';
import { UfoPresentationComponent } from './ufo-presentation.component';

describe('UfoPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: UfoPresentationComponent,
    shallow: true
  });

  it('should create the UfoPresentationComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
