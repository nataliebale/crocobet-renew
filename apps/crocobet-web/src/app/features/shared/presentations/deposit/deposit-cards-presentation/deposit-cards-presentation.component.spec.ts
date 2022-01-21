import { DepositCardsPresentationComponent } from './deposit-cards-presentation.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('DepositCardsPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: DepositCardsPresentationComponent,
    shallow: true
  });

  it('should create the DepositCardsPresentationComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
