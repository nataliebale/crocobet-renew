import { createComponentFactory } from '@ngneat/spectator';
import { AccountDetailsFormPresentationComponent } from './account-details-form-presentation.component';

describe('AccountDetailsFormPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: AccountDetailsFormPresentationComponent,
    shallow: true
  });

  it('should create the AccountDetailsFormPresentationComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
