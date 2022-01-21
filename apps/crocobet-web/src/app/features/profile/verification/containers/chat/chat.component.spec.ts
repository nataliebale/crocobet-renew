import { createComponentFactory } from '@ngneat/spectator';
import { ChatComponent } from './chat.component';

describe('ChatComponent', () => {
  const createComponent = createComponentFactory({
    component: ChatComponent,
    shallow: true
  });

  it('should create', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
