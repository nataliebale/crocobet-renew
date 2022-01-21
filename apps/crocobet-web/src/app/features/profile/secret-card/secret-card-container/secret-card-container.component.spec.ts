import { createComponentFactory } from '@ngneat/spectator';
import { SecretCardContainerComponent } from './secret-card-container.component';

describe('SecretCardContainerComponent', () => {
  const createComponent = createComponentFactory({
    component: SecretCardContainerComponent,
    shallow: true
  });

  it('should create the SecretCardContainerComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
