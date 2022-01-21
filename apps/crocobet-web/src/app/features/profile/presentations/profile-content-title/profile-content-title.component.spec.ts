import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { ProfileContentTitleComponent } from './profile-content-title.component';

describe('ProfileContentTitleComponent', () => {
  let spectator: Spectator<ProfileContentTitleComponent>;
  const createComponent = createComponentFactory(ProfileContentTitleComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
