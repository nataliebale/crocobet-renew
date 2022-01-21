import { PersonalInfoContainerComponent } from './personal-info-container.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('PersonalInfoContainerComponent', () => {
  const createComponent = createComponentFactory({
    component: PersonalInfoContainerComponent,
    shallow: true
  });

  it('should create the PersonalInfoContainerComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
