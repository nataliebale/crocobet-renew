import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard, NotVerifiedGuard, VisitorGuard } from '@crc/facade';

import { LayoutContainerComponent } from './containers/layout-container/layout-container.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('../features/main-page/main-page.module').then(
            (m) => m.MainPageModule
          ),
        canActivate: [NotVerifiedGuard]
      },
      {
        path: 'ufo',
        loadChildren: () =>
          import('../features/ufo/ufo.module').then((m) => m.UfoModule),
        canActivate: [LoginGuard, NotVerifiedGuard],
        data: {
          verification: {
            requireLogin: true
          }
        }
      },
      {
        path: 'games',
        loadChildren: () =>
          import('../features/games/games.module').then((m) => m.GamesModule),
        canActivate: [NotVerifiedGuard]
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../features/profile/profile.module').then(
            (m) => m.ProfileModule
          )
      },
      {
        path: 'poker',
        loadChildren: () =>
          import('../features/poker/poker.module').then((m) => m.PokerModule),
        canActivate: [NotVerifiedGuard]
      },
      {
        path: 'casino',
        loadChildren: () =>
          import('../features/casinos/casino.module').then(
            (m) => m.CasinoModule
          ),
        canActivate: [NotVerifiedGuard]
      },
      {
        path: 'slots',
        loadChildren: () =>
          import('../features/slots/slots.module').then((m) => m.SlotsModule),
        canActivate: [NotVerifiedGuard]
      },
      {
        path: 'slot-casino',
        loadChildren: () =>
          import(
            '../features/slot&casino/slot-casino-multi-game/slot-casino-multi-game.module'
          ).then((m) => m.SlotCasinoMultiGameModule),
        canActivate: [LoginGuard, NotVerifiedGuard],
        data: {
          verification: {
            requireLogin: true
          }
        }
      },
      {
        path: 'virtual',
        loadChildren: () =>
          import('../features/virtual/virtual.module').then(
            (m) => m.VirtualModule
          ),
        canActivate: [NotVerifiedGuard]
      },
      {
        path: 'register',
        loadChildren: () =>
          import('../features/register/register.module').then(
            (m) => m.RegisterModule
          ),
        canActivate: [VisitorGuard]
      },
      {
        path: 'promotions',
        loadChildren: () =>
          import('../features/promotions/promotions.module').then(
            (m) => m.PromotionsModule
          ),
        canActivate: [NotVerifiedGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
