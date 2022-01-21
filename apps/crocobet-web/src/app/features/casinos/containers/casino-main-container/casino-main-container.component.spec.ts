import { createComponentFactory } from '@ngneat/spectator';
import { CasinoMainContainerComponent } from './casino-main-container.component';

describe('CasinosContainerComponent', () => {
  const createComponent = createComponentFactory({
    component: CasinoMainContainerComponent,
    shallow: true
  });

  it('should create the CasinosContainerComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
