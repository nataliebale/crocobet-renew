import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { PopupComponent } from './popup.component';

describe('PopupComponent', () => {
  let spectator: Spectator<PopupComponent>;
  const createComponent = createComponentFactory(PopupComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
