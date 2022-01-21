import { SidebarPresentationComponent } from './sidebar-presentation.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('SidebarPresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: SidebarPresentationComponent,
    shallow: true
  });

  it('should create', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
