import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@crc/shared';
import { ComponentsModule } from '@crc/components';

import { SecretCardContainerComponent } from './secret-card-container/secret-card-container.component';
import { SecretCardPresentationComponent } from './secret-card-presentation/secret-card-presentation.component';

@NgModule({
  declarations: [SecretCardContainerComponent, SecretCardPresentationComponent],
  imports: [
    SharedModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: SecretCardContainerComponent
      }
    ])
  ]
})
export class SecretCardModule {}
