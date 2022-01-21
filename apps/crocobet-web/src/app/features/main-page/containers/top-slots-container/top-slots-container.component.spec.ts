import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { TopSlotsContainerComponent } from './top-slots-container.component';

describe('TopGamesContainerComponent', () => {
  let spectator: Spectator<TopSlotsContainerComponent>;
  const createComponent = createComponentFactory(TopSlotsContainerComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
