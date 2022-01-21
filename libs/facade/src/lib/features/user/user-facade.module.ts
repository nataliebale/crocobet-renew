import { NgModule } from '@angular/core';
import { UserFacade } from './facade/user.facade';

@NgModule({
  providers: [UserFacade]
})
export class UserFacadeModule {}
