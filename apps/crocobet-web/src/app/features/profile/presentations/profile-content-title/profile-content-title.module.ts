import { NgModule } from '@angular/core';
import { ProfileContentTitleComponent } from './profile-content-title.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ProfileContentTitleComponent],
  exports: [ProfileContentTitleComponent],
  imports: [CommonModule]
})
export class ProfileContentTitleModule {}
