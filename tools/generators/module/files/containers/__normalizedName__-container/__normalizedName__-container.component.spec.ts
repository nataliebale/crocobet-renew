import { createComponentFactory } from '@ngneat/spectator';
import { <%= feature.className %>ContainerComponent } from './<%= feature.fileName %>-container.component';
import { <%= feature.className %>Facade } from '@crc/facade';
import { mockProvider } from '@ngneat/spectator/jest';

describe('<%= feature.className %>ContainerComponent', () => {
  const createComponent = createComponentFactory({
    component: <%= feature.className %>ContainerComponent,
    shallow: true,
    providers: [mockProvider(<%= feature.className %>Facade)]
  });

  it('should create the <%= feature.className %>ContainerComponent', () => {
    const app = createComponent({});
    expect(app).toBeTruthy();
  });
});
