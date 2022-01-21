import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './slots-play-route-container.component.html',
  styleUrls: ['./slots-play-route-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlotsPlayRouteContainerComponent {
  sidebarState = true;
}
