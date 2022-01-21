import { createComponentFactory } from '@ngneat/spectator';
import { ResetPasswordStatusPresentationComponent } from './reset-password-status-presentation.component';

describe('ResetPasswordStatusPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: ResetPasswordStatusPresentationComponent,
    shallow: true,
    detectChanges: false
  });

  it('should create', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
