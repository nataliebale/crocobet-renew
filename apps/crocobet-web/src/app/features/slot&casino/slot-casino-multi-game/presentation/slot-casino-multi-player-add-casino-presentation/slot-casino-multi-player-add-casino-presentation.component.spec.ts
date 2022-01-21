import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SlotCasinoMultiPlayerAddCasinoPresentationComponent } from './slot-casino-multi-player-add-casino-presentation.component';

describe('SlotMultiGameAddGamePresentationComponent', () => {
  let spectator: Spectator<SlotCasinoMultiPlayerAddCasinoPresentationComponent>;
  const createComponent = createComponentFactory(
    SlotCasinoMultiPlayerAddCasinoPresentationComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
