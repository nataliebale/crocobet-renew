import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { JackpotPresentationComponent } from './jackpot-presentation.component';

describe('JackpotPresentationComponent', () => {
  let spectator: Spectator<JackpotPresentationComponent>;
  const createComponent = createComponentFactory(JackpotPresentationComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
