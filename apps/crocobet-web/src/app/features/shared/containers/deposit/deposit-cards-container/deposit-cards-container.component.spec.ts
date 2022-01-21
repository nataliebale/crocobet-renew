import { DepositCardsContainerComponent } from './deposit-cards-container.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('DepositCardsContainerComponent', () => {
  const createComponent = createComponentFactory({
    component: DepositCardsContainerComponent,
    shallow: true
  });

  it('should create the DepositCardsContainerComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
