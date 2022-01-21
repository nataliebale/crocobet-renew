import { PersonalInfoSettingsPresentationComponent } from './personal-info-settings-presentation.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('PersonalInfoSettingsPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: PersonalInfoSettingsPresentationComponent,
    shallow: true
  });

  it('should create the PersonalInfoSettingsPresentationComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
