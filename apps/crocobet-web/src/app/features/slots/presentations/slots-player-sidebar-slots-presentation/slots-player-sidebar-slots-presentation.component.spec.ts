import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SlotsPlayerSidebarSlotsPresentationComponent } from './slots-player-sidebar-slots-presentation.component';

describe('SlotsDetailSidebarPresentationComponent', () => {
  let spectator: Spectator<SlotsPlayerSidebarSlotsPresentationComponent>;
  const createComponent = createComponentFactory(
    SlotsPlayerSidebarSlotsPresentationComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
