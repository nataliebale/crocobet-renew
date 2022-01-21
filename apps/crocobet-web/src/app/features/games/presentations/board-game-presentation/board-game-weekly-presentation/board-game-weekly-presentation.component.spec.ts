import { BoardGameWeeklyPresentationComponent } from './board-game-weekly-presentation.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('BoardGameWeeklyPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: BoardGameWeeklyPresentationComponent,
    shallow: true
  });

  it('should create the BoardGameWeeklyPresentationComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
