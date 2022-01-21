import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'universal'
})
export class UniversalPipe implements PipeTransform {
  public transform(
    // eslint-disable-next-line @typescript-eslint/ban-types
    fnReference: Function,
    component: unknown,
    ...fnArgs: unknown[]
  ): unknown {
    return fnReference?.call(component, fnArgs);
  }
}
