import {
  animate,
  AnimationTriggerMetadata,
  style,
  transition,
  trigger
} from '@angular/animations';

export function slideInAndOut(delay: number): AnimationTriggerMetadata {
  return trigger('slideInAndOut', [
    transition(':enter', [
      style({
        transform: 'translateX(100%)'
      }),
      animate(
        delay,
        style({
          transform: 'translateX(0)'
        })
      )
    ]),
    transition(':leave', [
      style({
        transform: 'translateX(0)'
      }),
      animate(
        delay,
        style({
          transform: 'translateX(100%)'
        })
      )
    ])
  ]);
}

export function scaleInAndOut(delay: number): AnimationTriggerMetadata {
  return trigger('scaleInAndOut', [
    transition(':enter', [
      style({
        transform: 'scale(.9)'
      }),
      animate(
        delay,
        style({
          transform: 'scale(1)'
        })
      )
    ])
  ]);
}
