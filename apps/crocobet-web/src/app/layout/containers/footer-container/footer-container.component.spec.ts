import { FooterContainerComponent } from './footer-container.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('FooterContainerComponent', () => {
  const createComponent = createComponentFactory({
    component: FooterContainerComponent,
    shallow: true
  });

  it('should create', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
