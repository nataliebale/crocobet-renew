import { PersonalInfoPresentationComponent } from './personal-info-presentation.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('PersonalInfoPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: PersonalInfoPresentationComponent,
    shallow: true
  });

  it('should create the PersonalInfoPresentationComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
