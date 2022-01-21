import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Cashier, CashierPlace, CashiersFacade } from '@crc/facade';
import { LanguageFacade } from '@crc/shared';
import { combineLatest, switchMap, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl } from '@angular/forms';
import { filterCashiers } from '../../utils/cashiers.utils';
import { NgSelectItem } from '@crc/components';

@UntilDestroy()
@Component({
  selector: 'crc-w-cashiers',
  templateUrl: './cashiers.component.html',
  styleUrls: ['./cashiers.component.scss']
})
export class CashiersComponent implements OnInit {
  private cachedCashiers: Cashier[];

  cashierPlaces: CashierPlace[];
  cashiers: Cashier[];
  selectItems: NgSelectItem[] = [];
  isAlwaysOpenControl: FormControl = new FormControl();
  cityControl: FormControl = new FormControl();

  private getCashiersPlaces(): CashierPlace[] {
    return this.cashiers
      .map((cashier) => cashier.places)
      .reduce((sum, curr) => [...sum, ...curr], []);
  }

  constructor(
    private readonly cashiersFacade: CashiersFacade,
    private readonly languageFacade: LanguageFacade,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.languageFacade.current$
      .pipe(
        untilDestroyed(this),
        switchMap(() => this.cashiersFacade.getCashiers()),
        tap((cashiers: Cashier[]) => {
          this.cachedCashiers = cashiers;
          this.cityControl.patchValue(cashiers[0].name);
          this.isAlwaysOpenControl.patchValue(false);
          this.selectItems = [];
          cashiers.map(({ name }) => {
            const item: NgSelectItem = {
              id: name,
              key: name,
              value: name
            };
            this.selectItems.push(item);
          });
          this.cashiers = filterCashiers(
            cashiers,
            this.cityControl.value,
            this.isAlwaysOpenControl.value
          );
          this.cashierPlaces = this.getCashiersPlaces();
          this.cdr.markForCheck();
        })
      )
      .subscribe();

    combineLatest([
      this.cityControl.valueChanges,
      this.isAlwaysOpenControl.valueChanges
    ])
      .pipe(
        tap(([city, isAlwaysOpen]) => {
          this.cashiers = filterCashiers(
            this.cachedCashiers,
            city,
            isAlwaysOpen
          );
          this.cashierPlaces = this.getCashiersPlaces();
          this.cdr.markForCheck();
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
