import { trigger, style, animate, transition } from '@angular/animations';

export const Animations = {
  fadeInAndOut: trigger('fadeInAndOut', [
    transition('void => *', [style({ opacity: 0 }), animate(200, style({ opacity: 1 }))]),
    transition(':leave', [animate(200, style({ opacity: 0 }))])
  ])
};
