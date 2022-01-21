import { createComponentFactory } from '@ngneat/spectator';
import { <%= feature.className %>PresentationComponent } from './<%= feature.fileName %>-presentation.component';

describe('<%= feature.className %>PresentationComponent', () => {
  const createComponent = createComponentFactory({
    component: <%= feature.className %>PresentationComponent,
    shallow: true
  });

  it('should create the <%= feature.className %>PresentationComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
