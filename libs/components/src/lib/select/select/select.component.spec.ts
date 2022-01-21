import { SelectComponent } from './select.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('SelectComponent', () => {
  const createComponent = createComponentFactory({
    component: SelectComponent,
    shallow: true
  });

  it('should create the SelectComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
