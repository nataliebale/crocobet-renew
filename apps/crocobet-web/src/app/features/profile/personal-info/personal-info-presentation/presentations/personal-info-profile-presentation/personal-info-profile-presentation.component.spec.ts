import { PersonalInfoProfilePresentationComponent } from './personal-info-profile-presentation.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('PersonalInfoProfilePresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: PersonalInfoProfilePresentationComponent,
    shallow: true
  });

  it('should create the PersonalInfoProfilePresentationComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
