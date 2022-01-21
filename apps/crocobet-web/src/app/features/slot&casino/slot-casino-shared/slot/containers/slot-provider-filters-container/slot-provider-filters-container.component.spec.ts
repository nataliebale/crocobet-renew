import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SlotProviderFiltersContainerComponent } from './slot-provider-filters-container.component';

describe('ProviderFiltersContainerComponent', () => {
  let spectator: Spectator<SlotProviderFiltersContainerComponent>;
  const createComponent = createComponentFactory(
    SlotProviderFiltersContainerComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
