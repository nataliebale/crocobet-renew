import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { CasinoCategoryFiltersPresentationComponent } from './casino-category-filters-presentation.component';

describe('CategoryFiltersPresentationComponent', () => {
  let spectator: Spectator<CasinoCategoryFiltersPresentationComponent>;
  const createComponent = createComponentFactory(
    CasinoCategoryFiltersPresentationComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
