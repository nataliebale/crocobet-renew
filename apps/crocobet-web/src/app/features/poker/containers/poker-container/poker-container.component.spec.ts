import { createComponentFactory } from '@ngneat/spectator';
import { PokerContainerComponent } from './poker-container.component';
import { PokerFacade } from '@crc/facade';
import { mockProvider } from '@ngneat/spectator/jest';

describe('PokerContainerComponent', () => {
  const createComponent = createComponentFactory({
    component: PokerContainerComponent,
    shallow: true,
    providers: [mockProvider(PokerFacade)]
  });

  it('should create the PokerContainerComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
