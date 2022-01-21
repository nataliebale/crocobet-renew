import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SlotCategoryFiltersContainerComponent } from './slot-category-filters-container.component';

describe('CategoryFiltersContainerComponent', () => {
  let spectator: Spectator<SlotCategoryFiltersContainerComponent>;
  const createComponent = createComponentFactory(
    SlotCategoryFiltersContainerComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
