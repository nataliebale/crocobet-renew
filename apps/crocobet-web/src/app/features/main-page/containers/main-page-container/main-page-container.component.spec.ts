import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { MainPageContainerComponent } from './main-page-container.component';

describe('MainPageContainerComponent', () => {
  let spectator: Spectator<MainPageContainerComponent>;
  const createComponent = createComponentFactory(MainPageContainerComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
