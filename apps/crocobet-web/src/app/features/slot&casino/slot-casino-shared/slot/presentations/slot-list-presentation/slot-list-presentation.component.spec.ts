import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SlotListPresentationComponent } from './slot-list-presentation.component';

describe('GamesPresentationComponent', () => {
  let spectator: Spectator<SlotListPresentationComponent>;
  const createComponent = createComponentFactory(SlotListPresentationComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
