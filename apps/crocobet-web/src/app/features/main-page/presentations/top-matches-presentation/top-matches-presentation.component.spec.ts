import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { TopMatchesPresentationComponent } from './top-matches-presentation.component';

describe('TopMatchesPresentationComponent', () => {
  let spectator: Spectator<TopMatchesPresentationComponent>;
  const createComponent = createComponentFactory(
    TopMatchesPresentationComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
