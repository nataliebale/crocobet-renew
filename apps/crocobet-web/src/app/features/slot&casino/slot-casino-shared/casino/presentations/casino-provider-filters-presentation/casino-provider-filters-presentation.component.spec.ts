import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { CasinoProviderFiltersPresentationComponent } from './casino-provider-filters-presentation.component';

describe('ProviderFiltersPresentationComponent', () => {
  let spectator: Spectator<CasinoProviderFiltersPresentationComponent>;
  const createComponent = createComponentFactory(
    CasinoProviderFiltersPresentationComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
