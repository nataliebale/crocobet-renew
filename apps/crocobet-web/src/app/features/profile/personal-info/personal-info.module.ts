import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FormsModule as CustomFormsModule, SharedModule } from '@crc/shared';
import { ComponentsModule, ResetPasswordStatusModule } from '@crc/components';

import { PersonalInfoPresentationComponent } from './personal-info-presentation/personal-info-presentation.component';
import { PersonalInfoRoutingModule } from './personal-info-routing.module';
import { PersonalInfoProfilePresentationComponent } from './personal-info-presentation/presentations/personal-info-profile-presentation/personal-info-profile-presentation.component';
import { PersonalInfoSettingsPresentationComponent } from './personal-info-presentation/presentations/personal-info-settings-presentation/personal-info-settings-presentation.component';
import { PersonalInfoContainerComponent } from './personal-info-container/personal-info-container.component';
import { ChangePasswordDialogPresentationComponent } from './personal-info-presentation/presentations/change-password-dialog-presentation/change-password-dialog-presentation.component';
import { ProfileContentTitleModule } from '../presentations/profile-content-title/profile-content-title.module';

const containers = [PersonalInfoContainerComponent];
const presentations = [
  PersonalInfoPresentationComponent,
  PersonalInfoProfilePresentationComponent,
  PersonalInfoSettingsPresentationComponent,
  ChangePasswordDialogPresentationComponent
];
const externalModules = [
  SharedModule,
  FormsModule,
  CustomFormsModule,
  ComponentsModule,
  ResetPasswordStatusModule
];

@NgModule({
  declarations: [...containers, ...presentations],
  imports: [
    ...externalModules,
    PersonalInfoRoutingModule,
    ProfileContentTitleModule
  ]
})
export class PersonalInfoModule {}
