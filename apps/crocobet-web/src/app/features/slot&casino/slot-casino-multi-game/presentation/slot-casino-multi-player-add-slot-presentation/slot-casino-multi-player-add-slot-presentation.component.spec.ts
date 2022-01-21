import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SlotCasinoMultiPlayerAddSlotPresentationComponent } from './slot-casino-multi-player-add-slot-presentation.component';

describe('SlotMultiGameAddGamePresentationComponent', () => {
  let spectator: Spectator<SlotCasinoMultiPlayerAddSlotPresentationComponent>;
  const createComponent = createComponentFactory(
    SlotCasinoMultiPlayerAddSlotPresentationComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
