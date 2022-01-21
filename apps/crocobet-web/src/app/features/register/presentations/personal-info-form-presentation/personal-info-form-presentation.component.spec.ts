import { createComponentFactory } from '@ngneat/spectator';
import { PersonalInfoFormPresentationComponent } from './personal-info-form-presentation.component';

describe('PersonalInfoFormPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: PersonalInfoFormPresentationComponent,
    shallow: true
  });

  it('should create the PersonalInfoFormPresentationComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
