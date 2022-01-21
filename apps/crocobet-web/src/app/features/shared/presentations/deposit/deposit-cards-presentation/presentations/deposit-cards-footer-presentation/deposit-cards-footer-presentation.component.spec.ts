import { DepositCardsFooterPresentationComponent } from './deposit-cards-footer-presentation.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('DepositCardsFooterPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: DepositCardsFooterPresentationComponent,
    shallow: true
  });

  it('should create the DepositCardsFooterPresentationComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
