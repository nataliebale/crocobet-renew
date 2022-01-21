import { createComponentFactory } from '@ngneat/spectator';
import { LoginLargeViewPresentationComponent } from './login-large-view-presentation.component';

describe('LoginDialogPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: LoginLargeViewPresentationComponent,
    shallow: true
  });

  it('should create', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
