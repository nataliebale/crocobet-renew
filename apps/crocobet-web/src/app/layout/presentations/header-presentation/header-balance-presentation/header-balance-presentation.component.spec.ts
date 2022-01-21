import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { HeaderBalancePresentationComponent } from './header-balance-presentation.component';

describe('HeaderBalancePresentationComponent', () => {
  let spectator: Spectator<HeaderBalancePresentationComponent>;
  const createComponent = createComponentFactory(
    HeaderBalancePresentationComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
