import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { EnvironmentService } from '../../environment';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: `html, body, div, span, applet, object, iframe,
            h1, h2, h3, h4, h5, h6, p, blockquote, pre,
            a, abbr, acronym, address, big, cite, code,
            del, dfn, em, img, ins, kbd, q, s, samp,
            small, strike, strong, sub, sup, tt, var,
            b, u, i, center,
            dl, dt, dd, ol, ul, li,
            fieldset, form, label, legend,
            table, caption, tbody, tfoot, thead, tr, th, td,
            article, aside, canvas, details, embed, 
            figure, figcaption, footer, header, hgroup, 
            menu, nav, output, ruby, section, summary,
            time, mark, audio, video`
})
export class DataCyDirective {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private environment: EnvironmentService
  ) {
    if (environment.config.production) {
      renderer.removeAttribute(el.nativeElement, 'data-cy');
    }
  }
}
