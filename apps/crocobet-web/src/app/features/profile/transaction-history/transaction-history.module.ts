import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SharedModule } from '@crc/shared';
import { ComponentsModule, SelectModule } from '@crc/components';

import { TransactionsHistoryContainerComponent } from './transactions-history-container/transactions-history-container.component';
import { TransactionsHistoryPresentationComponent } from './transactions-history-presentation/transactions-history-presentation.component';

@NgModule({
  declarations: [
    TransactionsHistoryContainerComponent,
    TransactionsHistoryPresentationComponent
  ],
  imports: [
    SharedModule,
    ComponentsModule,
    InfiniteScrollModule,
    SelectModule,
    RouterModule.forChild([
      {
        path: '',
        component: TransactionsHistoryContainerComponent
      }
    ])
  ]
})
export class TransactionHistoryModule {}
