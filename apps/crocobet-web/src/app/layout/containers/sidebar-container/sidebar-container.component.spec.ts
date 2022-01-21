import { SidebarContainerComponent } from './sidebar-container.component';
import { createComponentFactory } from '@ngneat/spectator';

describe('SidebarContainerComponent', () => {
  const createComponent = createComponentFactory({
    component: SidebarContainerComponent,
    shallow: true
  });

  it('should create', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
