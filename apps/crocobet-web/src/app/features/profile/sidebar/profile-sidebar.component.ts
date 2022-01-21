import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProfileMenuFacade, ProfileMenuItem } from '@crc/facade';

@Component({
  selector: 'crc-w-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSidebarComponent {
  profileMenuItems: ProfileMenuItem[];

  constructor(profileMenuFacade: ProfileMenuFacade) {
    this.profileMenuItems = profileMenuFacade.getProfileMenuItems();
  }
}
