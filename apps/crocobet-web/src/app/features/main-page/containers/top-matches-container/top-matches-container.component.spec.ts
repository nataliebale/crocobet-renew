import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { TopMatchesContainerComponent } from './top-matches-container.component';

describe('TopMatchesContainerComponent', () => {
  let spectator: Spectator<TopMatchesContainerComponent>;
  const createComponent = createComponentFactory(TopMatchesContainerComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
