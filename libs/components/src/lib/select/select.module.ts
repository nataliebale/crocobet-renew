import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SelectComponent } from './select/select.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

const components = [SelectComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, RouterModule, NgSelectModule, FormsModule],
  exports: [...components]
})
export class SelectModule {}
