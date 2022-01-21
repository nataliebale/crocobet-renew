import { FooterPresentationComponent } from './footer-presentation/footer-presentation.component';
import { SidebarPresentationComponent } from './sidebar-presentation/sidebar-presentation.component';
import { headerPresentationComponents } from './header-presentation';

export const presentationComponents = [
  ...headerPresentationComponents,
  FooterPresentationComponent,
  SidebarPresentationComponent
];
