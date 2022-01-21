import { NgModule } from '@angular/core';

import { SharedModule } from '@crc/shared';

import { PromocodeContainerComponent } from './promocode-container/promocode-container.component';
import { PromocodePresentationComponent } from './promocode-presentation/promocode-presentation.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@crc/components';
import { ProfileContentTitleModule } from '../presentations/profile-content-title/profile-content-title.module';

@NgModule({
  declarations: [PromocodeContainerComponent, PromocodePresentationComponent],
  imports: [
    SharedModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: PromocodeContainerComponent
      }
    ]),
    ProfileContentTitleModule
  ]
})
export class PromoCodeModule {}
