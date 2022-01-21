import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { TimerCountdownComponent } from './timer-countdown.component';

describe('TimerCountdownComponent', () => {
  let spectator: Spectator<TimerCountdownComponent>;
  const createComponent = createComponentFactory(TimerCountdownComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
