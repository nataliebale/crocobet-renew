import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { CasinoSharedSearchComponent } from './casino-shared-search.component';

describe('CasinoSearchContainerComponent', () => {
  let spectator: Spectator<CasinoSharedSearchComponent>;
  const createComponent = createComponentFactory(CasinoSharedSearchComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
