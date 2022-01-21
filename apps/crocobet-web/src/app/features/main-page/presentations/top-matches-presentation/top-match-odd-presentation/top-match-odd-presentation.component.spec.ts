import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { TopMatchOddPresentationComponent } from './top-match-odd-presentation.component';

describe('TopMatchOddPresentationComponent', () => {
  let spectator: Spectator<TopMatchOddPresentationComponent>;
  const createComponent = createComponentFactory(
    TopMatchOddPresentationComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
