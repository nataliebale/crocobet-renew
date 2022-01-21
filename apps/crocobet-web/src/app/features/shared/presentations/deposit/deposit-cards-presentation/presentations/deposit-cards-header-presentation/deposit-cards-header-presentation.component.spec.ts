import { DepositCardsHeaderPresentationComponent } from './deposit-cards-header-presentation.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('DepositCardsHeaderPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: DepositCardsHeaderPresentationComponent,
    shallow: true
  });

  it('should create the DepositCardsHeaderPresentationComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
