import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { CasinoProviderFiltersContainerComponent } from './casino-provider-filters-container.component';

describe('ProviderFiltersContainerComponent', () => {
  let spectator: Spectator<CasinoProviderFiltersContainerComponent>;
  const createComponent = createComponentFactory(
    CasinoProviderFiltersContainerComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
