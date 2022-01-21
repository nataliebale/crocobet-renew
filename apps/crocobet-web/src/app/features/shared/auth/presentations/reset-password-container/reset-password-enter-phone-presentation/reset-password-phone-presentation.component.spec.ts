import { createComponentFactory } from '@ngneat/spectator';
import { ResetPasswordPhonePresentationComponent } from './reset-password-phone-presentation.component';

describe('ResetPasswordEnterPhoneNumberPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: ResetPasswordPhonePresentationComponent,
    shallow: true
  });

  it('should create', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
