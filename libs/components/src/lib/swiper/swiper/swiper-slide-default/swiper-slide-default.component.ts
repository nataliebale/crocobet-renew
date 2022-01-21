import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';

import { ImageSlideUnion } from '../entity/types';
import { openLink } from '@crc/shared';

@Component({
  selector: 'crc-shared-swiper-slide-default',
  templateUrl: './swiper-slide-default.component.html',
  styleUrls: ['./swiper-slide-default.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwiperSlideDefaultComponent {
  @Input() image: ImageSlideUnion;
  @Input() imageFill: boolean;

  @Output() clicked = new EventEmitter<unknown>();

  constructor(private readonly router: Router) {}

  onClick() {
    if (this.image.routerLink) {
      from(
        this.router.navigate([this.image.routerLink], {
          queryParams: this.image.routerQueryParams
        })
      ).subscribe();
    } else if (this.image.link) {
      openLink(this.image.link, this.image.target);
    }
    this.clicked.emit(this.image.callBack);
  }
}
