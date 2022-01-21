import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SlotProviderFiltersPresentationComponent } from './slot-provider-filters-presentation.component';

describe('ProviderFiltersPresentationComponent', () => {
  let spectator: Spectator<SlotProviderFiltersPresentationComponent>;
  const createComponent = createComponentFactory(
    SlotProviderFiltersPresentationComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
