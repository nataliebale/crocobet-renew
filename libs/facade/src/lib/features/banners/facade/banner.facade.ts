import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';

import { EnvironmentService, LanguageFacade } from '@crc/shared';

import { BannerService } from '../services/banner.service';
import { BannerType } from '../entity';
import { AccountFacade } from '../../../auth';

@Injectable({
  providedIn: 'root'
})
export class BannerFacade {
  constructor(
    private readonly service: BannerService,
    private readonly languageService: LanguageFacade,
    private readonly env: EnvironmentService,
    private readonly accountFacade: AccountFacade
  ) {}

  getBanners(bannerType: BannerType) {
    return this.accountFacade.customerId$.pipe(
      switchMap((customerId) =>
        this.languageService.current$.pipe(
          switchMap((lang) =>
            this.service.getBanners(
              this.env.config.platform,
              bannerType,
              lang,
              customerId
            )
          )
        )
      )
    );
  }
}
