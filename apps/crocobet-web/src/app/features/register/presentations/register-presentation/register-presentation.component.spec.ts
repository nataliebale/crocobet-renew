import { createComponentFactory } from '@ngneat/spectator';
import { RegisterPresentationComponent } from './register-presentation.component';

describe('RegisterPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: RegisterPresentationComponent,
    shallow: true
  });

  it('should create the RegisterPresentationComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
