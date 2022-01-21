import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginGuard, NotVerifiedGuard } from '@crc/facade';

import { ProfileComponent } from './profile.component';
import { DepositContainerComponent } from './containers/deposit-container/deposit-container.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'deposit'
      },
      {
        path: 'verification',
        loadChildren: () =>
          import('./verification/verification.module').then(
            (m) => m.VerificationModule
          ),
        canActivate: [LoginGuard]
      },
      {
        path: 'deposit',
        component: DepositContainerComponent,
        canActivate: [NotVerifiedGuard, LoginGuard]
      },
      {
        path: 'secret-card',
        loadChildren: () =>
          import('./secret-card/secret-card.module').then(
            (m) => m.SecretCardModule
          ),
        canActivate: [NotVerifiedGuard, LoginGuard]
      },
      {
        path: 'promocode',
        loadChildren: () =>
          import('./promo-code/promo-code.module').then(
            (m) => m.PromoCodeModule
          ),
        canActivate: [NotVerifiedGuard, LoginGuard]
      },
      {
        path: 'personal-info',
        loadChildren: () =>
          import('./personal-info/personal-info.module').then(
            (m) => m.PersonalInfoModule
          ),
        canActivate: [NotVerifiedGuard, LoginGuard]
      },
      {
        path: 'transactions-history',
        loadChildren: () =>
          import('./transaction-history/transaction-history.module').then(
            (m) => m.TransactionHistoryModule
          ),
        canActivate: [NotVerifiedGuard, LoginGuard]
      },
      {
        path: 'cashiers',
        loadChildren: () =>
          import('./cashiers/cashiers.module').then((m) => m.CashiersModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
