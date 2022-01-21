import { createComponentFactory } from '@ngneat/spectator';
import { ResetPasswordConfirmPresentationComponent } from './reset-password-confirm-presentation.component';

describe('ResetPasswordVerifyPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: ResetPasswordConfirmPresentationComponent,
    shallow: true
  });

  it('should create', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
