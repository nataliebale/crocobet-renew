import { NgModule } from '@angular/core';
import { FormsModule, SharedModule, SharedTranslateModule } from '@crc/shared';

import { RegisterRoutingModule } from './register-routing.module';
import {
  PersonalInfoFormPresentationComponent,
  RegisterPresentationComponent,
  RegisterSuccessPresentationComponent
} from './presentations';
import { RegisterContainerComponent } from './containers';
import { ComponentsModule } from '@crc/components';
import { NgSelectModule } from '@ng-select/ng-select';
import { AccountDetailsFormPresentationComponent } from './presentations/account-details-form-presentation/account-details-form-presentation.component';

const containerComponents = [RegisterContainerComponent];
const presenterComponents = [
  RegisterPresentationComponent,
  RegisterSuccessPresentationComponent,
  PersonalInfoFormPresentationComponent
];

const externalModules = [
  SharedModule,
  SharedTranslateModule,
  RegisterRoutingModule,
  FormsModule,
  ComponentsModule,
  NgSelectModule
];

@NgModule({
  declarations: [
    ...containerComponents,
    ...presenterComponents,
    AccountDetailsFormPresentationComponent
  ],
  imports: [...externalModules]
})
export class RegisterModule {}
