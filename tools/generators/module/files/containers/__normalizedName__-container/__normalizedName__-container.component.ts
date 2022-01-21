import { ChangeDetectionStrategy, Component } from '@angular/core';
import { <%= feature.className %>Facade } from '@crc/facade';
import { <%= feature.className %> } from '@crc/shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'crc-<%= feature.fileName %>-container',
  templateUrl: './<%= feature.fileName %>-container.component.html',
  styleUrls: ['./<%= feature.fileName %>-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%= feature.className %>ContainerComponent {
  <%= feature.propertyName %>$: Observable<<%= feature.className %>> = this.<%= feature.propertyName %>Facade.get<%= feature.className %>$;

  constructor(private readonly <%= feature.propertyName %>Facade: <%= feature.className %>Facade) {}

  onGet<%= feature.className %>() {
    this.<%= feature.propertyName %>Facade.get<%= feature.className %>();
  }
}
