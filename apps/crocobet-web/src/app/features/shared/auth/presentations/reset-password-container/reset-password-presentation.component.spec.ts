import { createComponentFactory } from '@ngneat/spectator';
import { ResetPasswordPresentationComponent } from './reset-password-presentation.component';

describe('HeaderResetPasswordContainerComponent', () => {
  const createComponent = createComponentFactory({
    component: ResetPasswordPresentationComponent,
    shallow: true,
    detectChanges: false
  });

  it('should create', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
