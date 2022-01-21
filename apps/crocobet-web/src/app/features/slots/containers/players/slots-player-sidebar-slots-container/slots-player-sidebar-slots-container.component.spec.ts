import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SlotsPlayerSidebarSlotsContainerComponent } from './slots-player-sidebar-slots-container.component';

describe('SlotsDetailSidebarContainerComponent', () => {
  let spectator: Spectator<SlotsPlayerSidebarSlotsContainerComponent>;
  const createComponent = createComponentFactory(
    SlotsPlayerSidebarSlotsContainerComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
