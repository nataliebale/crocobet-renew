import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { TopSlotsPresentationComponent } from './top-slots-presentation.component';

describe('TopGamesPresentationComponent', () => {
  let spectator: Spectator<TopSlotsPresentationComponent>;
  const createComponent = createComponentFactory(TopSlotsPresentationComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
