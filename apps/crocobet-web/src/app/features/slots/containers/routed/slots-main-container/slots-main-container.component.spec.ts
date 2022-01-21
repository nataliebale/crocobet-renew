import { createComponentFactory } from '@ngneat/spectator';
import { SlotsMainContainerComponent } from './slots-main-container.component';

describe('SlotsContainerComponent', () => {
  const createComponent = createComponentFactory({
    component: SlotsMainContainerComponent,
    shallow: true
  });

  it('should create the SlotsContainerComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
