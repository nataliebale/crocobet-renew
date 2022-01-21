import { FooterContainerComponent } from './footer-container/footer-container.component';
import { HeaderContainerComponent } from './header-container/header-container.component';
import { LayoutContainerComponent } from './layout-container/layout-container.component';
import { SidebarContainerComponent } from './sidebar-container/sidebar-container.component';
import { headerContainerComponents } from './header-container';

export const containerComponents = [
  ...headerContainerComponents,
  LayoutContainerComponent,
  HeaderContainerComponent,
  SidebarContainerComponent,
  FooterContainerComponent
];
