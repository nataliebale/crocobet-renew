import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SlotCasinoPlayerPresentationComponent } from './slot-casino-player-presentation.component';

describe('SlotGamePresentationComponent', () => {
  let spectator: Spectator<SlotCasinoPlayerPresentationComponent>;
  const createComponent = createComponentFactory(
    SlotCasinoPlayerPresentationComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
