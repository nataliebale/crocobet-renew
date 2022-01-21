import { createComponentFactory } from '@ngneat/spectator';
import { CaptchaPromptComponent } from './captcha-prompt.component';
import { mockProvider } from '@ngneat/spectator/jest';
import { FormBuilder } from '@angular/forms';

describe('CaptchaPromptComponent', () => {
  const createComponent = createComponentFactory({
    component: CaptchaPromptComponent,
    shallow: true,
    providers: [mockProvider(FormBuilder)]
  });

  it('should create the CaptchaPromptComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
