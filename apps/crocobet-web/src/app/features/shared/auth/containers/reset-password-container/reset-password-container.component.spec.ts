import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { ResetPasswordContainerComponent } from './reset-password-container.component';

describe('ResetPasswordContainerComponent', () => {
  let spectator: Spectator<ResetPasswordContainerComponent>;
  const createComponent = createComponentFactory(ResetPasswordContainerComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
