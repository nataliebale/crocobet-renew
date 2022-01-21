import { MainPageContainerComponent } from './main-page-container/main-page-container.component';
import { PromotionBannersContainerComponent } from './promotions-banners-container/promotion-banners-container.component';
import { TopSlotsContainerComponent } from './top-slots-container/top-slots-container.component';
import { TopMatchesContainerComponent } from './top-matches-container/top-matches-container.component';
import { JackpotContainerComponent } from './jackpot-container/jackpot-container.component';
import { JackpotOdometerContainerComponent } from '../presentations/jackpot-presentation/containers/jackpot-odometer-container/jackpot-odometer-container.component';

export const containerComponents = [
  MainPageContainerComponent,
  PromotionBannersContainerComponent,
  TopSlotsContainerComponent,
  TopMatchesContainerComponent,
  JackpotContainerComponent,
  JackpotOdometerContainerComponent
];

export const exportedContainerComponents = [
  PromotionBannersContainerComponent,
  JackpotContainerComponent
];
