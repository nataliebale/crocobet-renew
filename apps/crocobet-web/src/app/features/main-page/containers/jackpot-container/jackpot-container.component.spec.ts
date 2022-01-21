import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { JackpotContainerComponent } from './jackpot-container.component';

describe('JackpotContainerComponent', () => {
  let spectator: Spectator<JackpotContainerComponent>;
  const createComponent = createComponentFactory(JackpotContainerComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
