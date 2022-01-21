import { DepositOtherPaymentsPresentationComponent } from './deposit-other-payments-presentation.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('DepositOtherCardsPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: DepositOtherPaymentsPresentationComponent,
    shallow: true
  });

  it('should create the DepositOtherPaymentsPresentationComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
