import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SlotListItemPresentationComponent } from './slot-list-item-presentation.component';

describe('SlotListItemComponent', () => {
  let spectator: Spectator<SlotListItemPresentationComponent>;
  const createComponent = createComponentFactory(
    SlotListItemPresentationComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
