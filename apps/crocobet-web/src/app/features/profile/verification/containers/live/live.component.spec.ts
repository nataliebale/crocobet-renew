import { createComponentFactory } from '@ngneat/spectator';
import { LiveComponent } from './live.component';
import { mockProvider } from '@ngneat/spectator/jest';
import { VerificationFacade, VerificationService } from '@crc/facade';
import { LanguageStorage, SharedModule } from '@crc/shared';

describe('LiveComponent', () => {
  const createComponent = createComponentFactory({
    component: LiveComponent,
    shallow: true,
    imports: [SharedModule],
    providers: [
      mockProvider(VerificationFacade),
      mockProvider(VerificationService),
      mockProvider(LanguageStorage)
    ]
  });

  it('should create', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
