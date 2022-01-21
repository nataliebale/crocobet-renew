import { createComponentFactory } from '@ngneat/spectator';
import { PokerPresentationComponent } from './poker-presentation.component';

describe('PokerPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: PokerPresentationComponent,
    shallow: true
  });

  it('should create the PokerPresentationComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
