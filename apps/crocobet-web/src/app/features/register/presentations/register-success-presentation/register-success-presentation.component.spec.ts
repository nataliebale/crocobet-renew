import { createComponentFactory } from '@ngneat/spectator';
import { RegisterSuccessPresentationComponent } from './register-success-presentation.component';

describe('RegisterPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: RegisterSuccessPresentationComponent,
    shallow: true
  });

  it('should create the RegisterSuccessPresentationComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
