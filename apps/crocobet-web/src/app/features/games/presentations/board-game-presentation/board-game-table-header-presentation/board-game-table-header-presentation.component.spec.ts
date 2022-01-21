import { BoardGameTableHeaderPresentationComponent } from './board-game-table-header-presentation.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('BoardGameTablePresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: BoardGameTableHeaderPresentationComponent,
    shallow: true
  });

  it('should create the BoardGameTablePresentationComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
