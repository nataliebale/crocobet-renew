import { createComponentFactory } from '@ngneat/spectator';
import { ProfileComponent } from './profile.component';

describe('ProfileContainerComponent', () => {
  const createComponent = createComponentFactory({
    component: ProfileComponent,
    shallow: true
  });

  it('should create the ProfileContainerComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
