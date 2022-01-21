import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SlotCategoryFiltersPresentationComponent } from './slot-category-filters-presentation.component';

describe('CategoryFiltersPresentationComponent', () => {
  let spectator: Spectator<SlotCategoryFiltersPresentationComponent>;
  const createComponent = createComponentFactory(
    SlotCategoryFiltersPresentationComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
