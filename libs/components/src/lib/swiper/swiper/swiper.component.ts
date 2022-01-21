import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import SwiperCore, {
  Autoplay,
  Keyboard,
  Navigation,
  Pagination,
  Scrollbar
} from 'swiper';
import { PaginationOptions } from 'swiper/types';

import {
  ImageSlide,
  SwiperAutoPlaySettings,
  SwiperViewMode,
  TemplateRefWithContext
} from './entity/types';
import { defaultSwiperSettings } from './entity/constants';

SwiperCore.use([Pagination, Navigation, Autoplay, Keyboard, Scrollbar]);

@Component({
  selector: 'crc-shared-swiper',
  templateUrl: './swiper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwiperComponent implements OnInit, OnChanges {
  @Input() view: SwiperViewMode = defaultSwiperSettings.view;
  @Input() autoPlay = true;
  @Input() navigation = defaultSwiperSettings.navigation;
  @Input() pagination = defaultSwiperSettings.pagination;
  @Input() header = defaultSwiperSettings.header;
  @Input() switcher = defaultSwiperSettings.switcher;
  @Input() loop = defaultSwiperSettings.loop;
  @Input() slidesPerView = defaultSwiperSettings.slidesPerView;
  @Input() dragSwipe = defaultSwiperSettings.dragSwipe;
  @Input() scrollbar = defaultSwiperSettings.scrollbar;
  @Input() breakpoints = defaultSwiperSettings.breakpoints;
  @Input() tooltipSupport: boolean;
  @Input() images: ImageSlide[] = [];
  @Input() templateRef: TemplateRefWithContext;
  @Input() templateRefGrid: TemplateRefWithContext;

  @Output() clicked = new EventEmitter();

  defaultAutoPlay = defaultSwiperSettings.autoPlay;
  slidInProcess = false;
  gridImages: Array<Array<ImageSlide>> = [];
  paginationSettings: PaginationOptions = {
    clickable: true,
    renderBullet: () =>
      '<span class="swiper-pagination-bullet"><span class="bullet"></span></span>'
  };

  uiHideNavigation: boolean;
  uiHidePagination: boolean;

  private updateUI() {
    this.uiHideNavigation = !(this.view === 'single'
      ? this.navigation.single
      : this.navigation.grid);

    this.uiHidePagination = !(this.view === 'single'
      ? this.pagination.single
      : this.pagination.grid);
  }

  private produceGridImages() {
    this.gridImages = this.arrangeForGridView<ImageSlide>(this.images);
  }

  private normalizeGridImagesForTemplateRef() {
    if (this.templateRefGrid) {
      this.templateRefGrid = {
        ...this.templateRefGrid,
        context: this.arrangeForGridView<any>(this.templateRefGrid.context)
      };
    }
  }

  private arrangeForGridView<T>(arr: Array<T>): Array<Array<T>> {
    const newArr: Array<Array<T>> = [];

    for (let i = 0; i < arr.length; i++) {
      const j = Math.floor(i / 4);

      if (newArr[j] === undefined) {
        newArr[j] = [];
      }
      newArr[j].push(arr[i]);
    }

    return newArr;
  }

  ngOnInit() {
    this.normalizeGridImagesForTemplateRef();
    this.updateUI();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.images && changes.images.currentValue) {
      if (this.switcher || this.view === 'grid') {
        this.produceGridImages();
      }
    }
  }

  switchView() {
    this.view = this.view === 'single' ? 'grid' : 'single';
    this.updateUI();
  }
}
