import { FooterPresentationComponent } from './footer-presentation.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('FooterPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: FooterPresentationComponent,
    shallow: true
  });

  it('should create', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
