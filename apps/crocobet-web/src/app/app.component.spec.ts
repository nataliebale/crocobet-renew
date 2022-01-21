import { AppComponent } from './app.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('AppComponent', () => {
  const createComponent = createComponentFactory({
    component: AppComponent,
    shallow: true
  });

  it('should create the app', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
