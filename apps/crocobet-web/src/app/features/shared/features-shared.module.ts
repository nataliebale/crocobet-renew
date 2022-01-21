import { NgModule } from '@angular/core';

import { ComponentsModule } from '@crc/components';
import { FormsModule, SharedModule } from '@crc/shared';

import { containerComponents } from './containers';
import { presentationComponents } from './presentations';
import { authContainerComponents, authPresentationComponents } from './auth';

const externalModules = [ComponentsModule, SharedModule, FormsModule];

@NgModule({
  declarations: [
    ...containerComponents,
    ...presentationComponents,
    ...authContainerComponents,
    ...authPresentationComponents
  ],
  exports: [...containerComponents, ...authContainerComponents],
  imports: [...externalModules]
})
export class FeaturesSharedModule {}
