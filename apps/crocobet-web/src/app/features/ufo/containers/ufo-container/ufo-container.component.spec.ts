import { createComponentFactory } from '@ngneat/spectator';
import { UfoContainerComponent } from './ufo-container.component';
import { UfoFacade } from '@crc/facade';
import { mockProvider } from '@ngneat/spectator/jest';

describe('UfoContainerComponent', () => {
  const createComponent = createComponentFactory({
    component: UfoContainerComponent,
    shallow: true,
    providers: [mockProvider(UfoFacade)]
  });

  it('should create the UfoContainerComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
