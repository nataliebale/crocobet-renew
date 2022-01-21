import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SlotListContainerComponent } from './slot-list-container.component';

describe('GamesListContainerComponent', () => {
  let spectator: Spectator<SlotListContainerComponent>;
  const createComponent = createComponentFactory(SlotListContainerComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
