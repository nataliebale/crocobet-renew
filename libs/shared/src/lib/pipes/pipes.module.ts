import { NgModule } from '@angular/core';
import { ToStringPipe } from './to-string/to-string.pipe';
import { SafeUrlPipe } from './safe-url/safe-url.pipe';
import { CustomCurrencyPipe } from './custom-currency/custom-currency.pipe';
import { UniversalPipe } from './universal/universal.pipe';

const pipes = [CustomCurrencyPipe, ToStringPipe, SafeUrlPipe, UniversalPipe];

@NgModule({
  imports: [],
  declarations: [...pipes],
  exports: [...pipes]
})
export class PipesModule {}
