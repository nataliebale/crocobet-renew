import { createComponentFactory } from '@ngneat/spectator';
import { HeaderLoginPresentationComponent } from './header-login-presentation.component';
import { mockProvider } from '@ngneat/spectator/jest';
import { FormBuilder } from '@angular/forms';

describe('HeaderSignInPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: HeaderLoginPresentationComponent,
    shallow: true,
    providers: [mockProvider(FormBuilder)]
  });

  it('should create', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
