import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { TransactionsHistoryPresentationComponent } from './transactions-history-presentation.component';

describe('TransactionsHistoryPresentationComponent', () => {
  let spectator: Spectator<TransactionsHistoryPresentationComponent>;
  const createComponent = createComponentFactory(
    TransactionsHistoryPresentationComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
