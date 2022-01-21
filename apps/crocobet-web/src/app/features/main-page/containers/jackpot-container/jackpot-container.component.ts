import { ChangeDetectionStrategy, Component } from '@angular/core';
import { finalize, from } from 'rxjs';
import { Router } from '@angular/router';
import { SlotsFiltersFacade } from '@crc/facade';
import {
  createImageSlideCallBack,
  ImageSlideCallBacked
} from '@crc/components';

@Component({
  selector: 'crc-jackpot-container',
  templateUrl: './jackpot-container.component.html',
  styleUrls: ['./jackpot-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JackpotContainerComponent {
  constructor(
    private readonly router: Router,
    private readonly slotsFiltersFacade: SlotsFiltersFacade
  ) {}

  jackpots: ImageSlideCallBacked<string>[] = [
    createImageSlideCallBack('egt', 'assets/images/jackpot/egt-jackpot.png')
  ];

  onImageClick(provider: unknown) {
    from(this.router.navigate(['slots']))
      .pipe(
        finalize(() =>
          this.slotsFiltersFacade.selectFilter({
            filter: provider as string,
            filterType: 'provider'
          })
        )
      )
      .subscribe();
  }
}
