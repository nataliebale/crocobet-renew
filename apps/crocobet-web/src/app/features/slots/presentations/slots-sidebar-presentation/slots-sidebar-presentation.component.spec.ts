import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SlotsSidebarPresentationComponent } from './slots-sidebar-presentation.component';

describe('SlotsSidebarPresentationComponent', () => {
  let spectator: Spectator<SlotsSidebarPresentationComponent>;
  const createComponent = createComponentFactory(
    SlotsSidebarPresentationComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
