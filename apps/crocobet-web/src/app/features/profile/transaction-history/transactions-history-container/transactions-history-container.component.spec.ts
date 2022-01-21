import { createComponentFactory } from '@ngneat/spectator';
import { TransactionsHistoryContainerComponent } from './transactions-history-container.component';

describe('TransactionsHistoryContainerComponent', () => {
  const createComponent = createComponentFactory({
    component: TransactionsHistoryContainerComponent,
    shallow: true
  });

  it('should create the TransactionsHistoryContainerComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
