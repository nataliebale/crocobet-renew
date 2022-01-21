import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { HeaderDepositPresentationComponent } from './header-deposit-presentation.component';

describe('HeaderDepositPresentationComponent', () => {
  let spectator: Spectator<HeaderDepositPresentationComponent>;
  const createComponent = createComponentFactory(
    HeaderDepositPresentationComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
