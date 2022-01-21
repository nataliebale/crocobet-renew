import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SlotSharedSearchComponent } from './slot-shared-search.component';

describe('SlotSearchContainerComponent', () => {
  let spectator: Spectator<SlotSharedSearchComponent>;
  const createComponent = createComponentFactory(SlotSharedSearchComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
