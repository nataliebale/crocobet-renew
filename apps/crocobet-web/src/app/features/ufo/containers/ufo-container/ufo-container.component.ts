import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UfoFacade } from '@crc/facade';
import { scrollToAnchor } from '@crc/shared';

@Component({
  selector: 'crc-ufo-container',
  templateUrl: './ufo-container.component.html',
  styleUrls: ['./ufo-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@UntilDestroy()
export class UfoContainerComponent implements OnInit {
  iframeSrc$: Observable<string> = this.getUfoLink();

  constructor(private readonly ufoFacade: UfoFacade) {}

  ngOnInit() {
    scrollToAnchor('ufo', 100);
  }

  getUfoLink(): Observable<string> {
    return this.ufoFacade
      .getUfoLink()
      .pipe(map((url) => this.ufoFacade.replaceLanguage(url)));
  }
}
