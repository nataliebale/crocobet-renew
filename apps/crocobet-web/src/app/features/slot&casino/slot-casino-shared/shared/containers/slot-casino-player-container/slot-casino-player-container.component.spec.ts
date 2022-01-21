import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SlotCasinoPlayerContainerComponent } from './slot-casino-player-container.component';

describe('SlotGameContainerComponent', () => {
  let spectator: Spectator<SlotCasinoPlayerContainerComponent>;
  const createComponent = createComponentFactory(
    SlotCasinoPlayerContainerComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
