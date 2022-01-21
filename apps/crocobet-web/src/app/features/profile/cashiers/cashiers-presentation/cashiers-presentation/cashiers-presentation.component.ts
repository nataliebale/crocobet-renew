import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input
} from '@angular/core';
import { CashierPlace } from '@crc/facade';
import { cashiersMatch } from '../../utils/cashiers.utils';
import { catchError, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {
  CASHIER_ZOOM,
  COUNTRY_ZOOM,
  GOOGLE_MAPS_API_KEY,
  INITIAL_LAT,
  INITIAL_LNG,
  MAP_STYLES
} from '../../constants/map.constants';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'crc-w-cashiers-presentation',
  templateUrl: './cashiers-presentation.component.html',
  styleUrls: ['./cashiers-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CashiersPresentationComponent {
  private selectedCashier: CashierPlace;

  @Input() set cashiers(cashiers: CashierPlace[]) {
    this.cashierPlaces = cashiers;

    if (this.mapLoaded) {
      this.initializeMapDefaultOptions();
    }
  }

  @Input() markerOptions: google.maps.MarkerOptions = { draggable: false };

  mapLoaded: boolean;
  cashierPlaces: CashierPlace[];

  mapOptions: google.maps.MapOptions;

  private initializeMapDefaultOptions() {
    const center: google.maps.LatLngLiteral = {
      lat: INITIAL_LAT,
      lng: INITIAL_LNG
    };

    this.mapOptions = {
      center,
      zoom: COUNTRY_ZOOM,
      styles: MAP_STYLES,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: false,
      scrollwheel: true
    };
    this.cdr.markForCheck();
  }

  constructor(private readonly cdr: ChangeDetectorRef, httpClient: HttpClient) {
    httpClient
      .jsonp(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`,
        'callback'
      )
      .pipe(
        map(() => true),
        tap(() => {
          this.mapLoaded = true;
          this.initializeMapDefaultOptions();
        }),
        untilDestroyed(this),
        catchError(() => of(false))
      )
      .subscribe();
  }

  onCashierSelected(cashier: CashierPlace | null) {
    this.selectedCashier = cashier;
    if (cashier) {
      const center: google.maps.LatLngLiteral = {
        lat: cashier.coordinates.lat,
        lng: cashier.coordinates.lon
      };
      this.mapOptions = {
        ...this.mapOptions,
        zoom: CASHIER_ZOOM,
        center
      };
    } else {
      this.initializeMapDefaultOptions();
    }
    this.cdr.markForCheck();
  }

  isCashierSelected(cashier): boolean {
    return cashiersMatch(cashier, this.selectedCashier);
  }

  getMarkerPosition(cashier: CashierPlace): google.maps.LatLngLiteral {
    return {
      lat: cashier.coordinates.lat,
      lng: cashier.coordinates.lon
    };
  }
}
