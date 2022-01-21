import { BoardGameTournamentsPresentationComponent } from './board-game-tournaments-presentation.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('BoardGameTournamentsPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: BoardGameTournamentsPresentationComponent,
    shallow: true
  });

  it('should create the BoardGameTournamentsPresentationComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
