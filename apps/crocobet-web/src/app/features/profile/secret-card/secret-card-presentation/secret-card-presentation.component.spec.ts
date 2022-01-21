import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SecretCardPresentationComponent } from './secret-card-presentation.component';

describe('SecretCardPresentationComponent', () => {
  let spectator: Spectator<SecretCardPresentationComponent>;
  const createComponent = createComponentFactory(
    SecretCardPresentationComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
