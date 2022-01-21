import { BoardGamePresentationComponent } from './board-game-presentation.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('BoardGamePresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: BoardGamePresentationComponent,
    shallow: true
  });

  it('should create the BoardGamePresentationComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
