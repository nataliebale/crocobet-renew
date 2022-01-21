import { DepositCardsContentPresentationComponent } from './deposit-cards-content-presentation.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('DepositCardsContentPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: DepositCardsContentPresentationComponent,
    shallow: true
  });

  it('should create the DepositCardsContentPresentationComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
