import { TemplateRef } from '@angular/core';
import { Params } from '@angular/router';
import { LinkTarget } from '@crc/shared';

export type SwiperAutoPlaySettings =
  | boolean
  | {
      delay: number;
      disableOnInteraction?: boolean;
    };

export type SwiperViewMode = 'single' | 'grid';
export type SwiperPaginationSettings = {
  single?: boolean;
  grid?: boolean;
};

export type SwiperNavigationSettings = {
  single?: boolean;
  grid?: boolean;
};

export type SwiperBreakpoints = {
  [size: string]: BreakpointSettings;
};

export type BreakpointSettings = {
  slidesPerView: number;
  spaceBetween?: number;
};

export type ScrollbarSettings = {
  draggable: boolean;
};

export type SwiperSettings = {
  view: SwiperViewMode;
  autoPlay: SwiperAutoPlaySettings;
  header: boolean;
  switcher: boolean;
  loop: boolean;
  navigation: SwiperNavigationSettings;
  pagination: SwiperPaginationSettings;
  slidesPerView: number;
  dragSwipe: boolean;
  scrollbar?: ScrollbarSettings;
  breakpoints?: SwiperBreakpoints;
};

export type TemplateRefWithContext = {
  template: TemplateRef<any> | null;
  context: any[];
};

export type ImageSlide = {
  src: string;
  alt?: string;
  link?: string;
  target?: LinkTarget;
};

export type ImageSlideRouted = ImageSlide & {
  routerLink: string;
  routerQueryParams?: Params;
};

export type ImageSlideCallBacked<T> = ImageSlide & {
  callBack: T;
};

export type ImageSlideUnion = ImageSlideRouted & ImageSlideCallBacked<unknown>;

export function createImageSlide(
  src: string,
  link?: string,
  alt?: string,
  target: LinkTarget = '_blank'
) {
  return { src: src, alt: alt, target: target, link: link } as ImageSlide;
}

export function createImageSlideRouter<T>(
  routerLink: string,
  src: string,
  link?: string,
  alt?: string,
  routerQueryParams?: Params,
  target: LinkTarget = '_self'
): ImageSlideRouted {
  return {
    ...createImageSlide(src, link, alt, target),
    routerLink,
    routerQueryParams
  } as ImageSlideRouted;
}

export function createImageSlideCallBack<T>(
  callback: T,
  src: string,
  link?: string,
  alt?: string,
  target: LinkTarget = '_self'
): ImageSlideCallBacked<T> {
  return {
    ...createImageSlide(src, link, alt, target),
    callBack: callback
  } as ImageSlideCallBacked<T>;
}
