import { createComponentFactory } from '@ngneat/spectator';
import { RegisterContainerComponent } from './register-container.component';
import { RegisterFacade } from '@crc/facade';
import { mockProvider } from '@ngneat/spectator/jest';

describe('RegisterContainerComponent', () => {
  const createComponent = createComponentFactory({
    component: RegisterContainerComponent,
    shallow: true,
    providers: [mockProvider(RegisterFacade)]
  });

  it('should create the RegisterContainerComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
