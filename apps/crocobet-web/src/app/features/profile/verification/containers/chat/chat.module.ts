import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ComponentsModule } from '@crc/components';

@NgModule({
  declarations: [ChatComponent],
  imports: [CommonModule, ChatRoutingModule, ComponentsModule]
})
export class ChatModule {}
