import { SlotsMainContainerComponent } from './routed/slots-main-container/slots-main-container.component';
import { SlotsPlayRouteContainerComponent } from './routed/slots-play-route-container/slots-play-route-container.component';
import { SlotsPlayerSidebarSlotsContainerComponent } from './players/slots-player-sidebar-slots-container/slots-player-sidebar-slots-container.component';
import { SlotsMainRouteContainerComponent } from './routed/slots-main-route-container/slots-main-route-container.component';

export * from './routed/slots-main-container/slots-main-container.component';
export * from '../../slot&casino/slot-casino-multi-game/containers/slot-casino-multi-player-container/slot-casino-multi-player-container.component';
export * from './routed/slots-main-route-container/slots-main-route-container.component';
export * from './routed/slots-play-route-container/slots-play-route-container.component';

export const containerComponents = [
  SlotsMainContainerComponent,
  SlotsMainRouteContainerComponent,
  SlotsPlayRouteContainerComponent,
  SlotsPlayerSidebarSlotsContainerComponent
];
