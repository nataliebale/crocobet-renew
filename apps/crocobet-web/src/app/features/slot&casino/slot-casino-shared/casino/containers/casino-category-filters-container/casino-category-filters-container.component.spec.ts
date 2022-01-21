import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { CasinoCategoryFiltersContainerComponent } from './casino-category-filters-container.component';

describe('CategoryFiltersContainerComponent', () => {
  let spectator: Spectator<CasinoCategoryFiltersContainerComponent>;
  const createComponent = createComponentFactory(
    CasinoCategoryFiltersContainerComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
