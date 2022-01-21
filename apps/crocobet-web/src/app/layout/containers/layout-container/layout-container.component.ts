import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { scrollWindowTo } from '@crc/shared';

@Component({
  selector: 'crc-layout',
  templateUrl: './layout-container.component.html',
  styleUrls: ['./layout-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutContainerComponent {
  constructor(private readonly router: Router) {
    router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        tap((_) => scrollWindowTo(0))
      )
      .subscribe();
  }
}
