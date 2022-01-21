import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { HeaderProfileContainerComponent } from './header-profile-container.component';

describe('HeaderProfileContainerComponent', () => {
  let spectator: Spectator<HeaderProfileContainerComponent>;
  const createComponent = createComponentFactory(
    HeaderProfileContainerComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
