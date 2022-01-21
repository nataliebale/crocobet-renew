import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { ProfileSidebarComponent } from './profile-sidebar.component';

describe('SlotsDetailSidebarPresentationComponent', () => {
  let spectator: Spectator<ProfileSidebarComponent>;
  const createComponent = createComponentFactory(ProfileSidebarComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
