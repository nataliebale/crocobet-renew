import { createComponentFactory } from '@ngneat/spectator';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  const createComponent = createComponentFactory({
    component: SearchComponent,
    shallow: true
  });

  it('should create the SearchComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
