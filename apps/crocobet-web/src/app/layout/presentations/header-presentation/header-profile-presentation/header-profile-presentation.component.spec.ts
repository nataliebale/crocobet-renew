import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { HeaderProfilePresentationComponent } from './header-profile-presentation.component';

describe('HeaderProfilePresentationComponent', () => {
  let spectator: Spectator<HeaderProfilePresentationComponent>;
  const createComponent = createComponentFactory(
    HeaderProfilePresentationComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
