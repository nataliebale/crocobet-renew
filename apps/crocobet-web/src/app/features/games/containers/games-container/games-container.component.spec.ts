import { createComponentFactory } from '@ngneat/spectator';
import { GamesContainerComponent } from './games-container.component';

describe('GamesContainerComponent', () => {
  const createComponent = createComponentFactory({
    component: GamesContainerComponent,
    shallow: true
  });

  it('should create the GamesListContainerComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
