import { createComponentFactory } from '@ngneat/spectator';
import { ChangePasswordDialogPresentationComponent } from './change-password-dialog-presentation.component';

describe('RecoveryPasswordDialogPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: ChangePasswordDialogPresentationComponent,
    shallow: true
  });

  it('should create', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
